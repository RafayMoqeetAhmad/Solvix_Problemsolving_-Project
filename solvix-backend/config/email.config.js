const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

/**
 * Generalized Email Service
 * Supports SMTP, Gmail, SendGrid, Mailgun, and custom providers
 */
class EmailService {
  constructor(config = {}) {
    this.config = config;
    this.transporter = null;
    this.defaultFrom = config.defaultFrom || "no-reply@example.com";
    this.templateDir = config.templateDir || path.join(__dirname, "../templates");
    this._init();
  }

  /**
   * Initialize the transporter based on provider
   */
  _init() {
    const { provider = "smtp", ...options } = this.config;

    const transportConfigs = {
      smtp: () => ({
        host: options.host || "smtp.gmail.com",
        port: options.port || 587,
        secure: options.secure || false, // true for 465, false for other ports
        auth: {
          user: options.user,
          pass: options.pass,
        },
        tls: { rejectUnauthorized: options.rejectUnauthorized ?? true },
      }),

      gmail: () => ({
        service: "gmail",
        auth: {
          user: options.user,
          pass: options.pass, // Use App Password, not account password
        },
      }),

      sendgrid: () => ({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false,
        auth: {
          user: "apikey",
          pass: options.apiKey,
        },
      }),

      mailgun: () => ({
        host: `smtp.mailgun.org`,
        port: 587,
        secure: false,
        auth: {
          user: options.user || `postmaster@${options.domain}`,
          pass: options.apiKey,
        },
      }),

      ses: () => ({
        host: options.host || `email-smtp.${options.region || "us-east-1"}.amazonaws.com`,
        port: 587,
        secure: false,
        auth: {
          user: options.accessKeyId,
          pass: options.secretAccessKey,
        },
      }),

      custom: () => options.transportConfig,
    };

    const getConfig = transportConfigs[provider] || transportConfigs.custom;
    this.transporter = nodemailer.createTransport(getConfig());
  }

  /**
   * Verify the transporter connection
   */
  async verify() {
    try {
      await this.transporter.verify();
      console.log("✅ Email service connection verified successfully.");
      return true;
    } catch (err) {
      console.error("❌ Email service connection failed:", err.message);
      return false;
    }
  }

  /**
   * Load an HTML template file and replace placeholders
   * @param {string} templateName - Template filename without extension
   * @param {object} variables - Key-value pairs to replace in template
   */
  _loadTemplate(templateName, variables = {}) {
    const templatePath = path.join(this.templateDir, `${templateName}.html`);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template "${templateName}" not found at ${templatePath}`);
    }

    let html = fs.readFileSync(templatePath, "utf-8");

    // Replace {{key}} placeholders
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      html = html.replace(regex, value);
    });

    return html;
  }

  /**
   * Build the mail options object
   */
  _buildMailOptions(options) {
    const {
      to,
      from = this.defaultFrom,
      cc,
      bcc,
      subject,
      text,
      html,
      template,
      templateVars = {},
      attachments = [],
      replyTo,
      headers = {},
    } = options;

    if (!to) throw new Error("Recipient email address (to) is required.");
    if (!subject) throw new Error("Email subject is required.");
    if (!text && !html && !template) throw new Error("Email body (text, html, or template) is required.");

    const mailOptions = {
      from,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      headers,
    };

    if (cc) mailOptions.cc = Array.isArray(cc) ? cc.join(", ") : cc;
    if (bcc) mailOptions.bcc = Array.isArray(bcc) ? bcc.join(", ") : bcc;
    if (replyTo) mailOptions.replyTo = replyTo;

    // HTML body: template takes priority over direct html
    if (template) {
      mailOptions.html = this._loadTemplate(template, templateVars);
    } else if (html) {
      mailOptions.html = html;
    }

    if (text) mailOptions.text = text;

    // Attachments: [{ filename, path?, content?, contentType? }]
    if (attachments.length > 0) {
      mailOptions.attachments = attachments;
    }

    return mailOptions;
  }

  /**
   * Send a single email
   * @param {object} options - Mail options
   * @returns {object} - Nodemailer info object
   */
  async send(options) {
    const mailOptions = this._buildMailOptions(options);
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${mailOptions.to} | MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId, info };
    } catch (err) {
      console.error(`❌ Failed to send email to ${mailOptions.to}:`, err.message);
      throw err;
    }
  }

  /**
   * Send bulk emails (sequentially with optional delay)
   * @param {Array} recipients - Array of mail option objects
   * @param {number} delayMs - Delay between emails in milliseconds
   */
  async sendBulk(recipients, delayMs = 100) {
    const results = [];
    for (const options of recipients) {
      try {
        const result = await this.send(options);
        results.push({ ...result, to: options.to });
      } catch (err) {
        results.push({ success: false, to: options.to, error: err.message });
      }
      if (delayMs > 0) await this._delay(delayMs);
    }
    return results;
  }

  /**
   * Send the same email to multiple recipients using BCC
   * @param {Array<string>} recipients - List of recipient emails
   * @param {object} options - Common mail options (subject, html, etc.)
   */
  async sendToMany(recipients, options) {
    return this.send({ ...options, to: options.from || this.defaultFrom, bcc: recipients });
  }

  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Close the transporter connection pool
   */
  close() {
    this.transporter.close();
  }
}

module.exports = EmailService;