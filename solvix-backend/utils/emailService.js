const nodemailer = require('nodemailer');

// ─── Transporter Setup ─────────────────────────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,  // Gmail App Password (16 chars)
    },
  });
};

// ─── 1. Admin ko notify karo jab user problem submit kare ──────────
const notifyAdminNewProblem = async (problem, user) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Solvix System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🆕 Nai Problem Submit Hui — ${problem.category}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          
          <div style="background: #4F46E5; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">⚡ Solvix Admin Alert</h1>
          </div>

          <div style="padding: 24px;">
            <h2 style="color: #1F2937; margin-top: 0;">Nai Problem Submit Hui!</h2>
            
            <div style="background: #F9FAFB; border-left: 4px solid #4F46E5; padding: 16px; border-radius: 4px; margin: 16px 0;">
              <p style="margin: 0 0 8px;"><strong>User:</strong> ${user.name || user.username}</p>
              <p style="margin: 0 0 8px;"><strong>Email:</strong> ${user.email}</p>
              <p style="margin: 0 0 8px;"><strong>Title:</strong> ${problem.title}</p>
              <p style="margin: 0 0 8px;"><strong>Category:</strong> ${problem.category}</p>
              <p style="margin: 0;"><strong>Status:</strong> <span style="color: #F59E0B;">Pending</span></p>
            </div>

            <div style="background: #FEF3C7; padding: 12px; border-radius: 6px; margin: 16px 0;">
              <p style="margin: 0; color: #92400E;"><strong>Description:</strong></p>
              <p style="margin: 8px 0 0; color: #78350F;">${problem.description}</p>
            </div>

            <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/admin" 
               style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 8px;">
              Admin Dashboard Kholo →
            </a>
          </div>

          <div style="background: #F3F4F6; padding: 16px; text-align: center;">
            <p style="margin: 0; color: #9CA3AF; font-size: 12px;">Solvix Platform — Auto Notification</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin ko email bheji: nai problem — ${problem.title}`);
    return true;
  } catch (error) {
    console.error('❌ Admin email error:', error.message);
    return false; // Email fail hone se problem submit fail nahi hogi
  }
};

// ─── 2. User ko notify karo jab admin problem solve kare ──────────
const notifyUserProblemSolved = async (problem, adminReply) => {
  try {
    const transporter = createTransporter();

    const userEmail = problem.user?.email;
    const userName = problem.user?.name || problem.user?.username || 'User';

    if (!userEmail) {
      console.warn('⚠️ User email nahi mili, notification skip');
      return false;
    }

    const mailOptions = {
      from: `"Solvix Support" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `✅ Aapki Problem Solve Ho Gayi — ${problem.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          
          <div style="background: #10B981; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">✅ Aapki Problem Solve Ho Gayi!</h1>
          </div>

          <div style="padding: 24px;">
            <p style="color: #374151; font-size: 16px;">Assalam-o-Alaikum <strong>${userName}</strong>!</p>
            <p style="color: #6B7280;">Aapki submit ki hui problem ka jawab aa gaya hai.</p>

            <div style="background: #F9FAFB; border-left: 4px solid #10B981; padding: 16px; border-radius: 4px; margin: 16px 0;">
              <p style="margin: 0 0 4px; color: #9CA3AF; font-size: 12px;">AAPKI PROBLEM:</p>
              <p style="margin: 0; color: #1F2937; font-weight: bold;">${problem.title}</p>
              <p style="margin: 4px 0 0; color: #6B7280; font-size: 13px;">Category: ${problem.category}</p>
            </div>

            <div style="background: #ECFDF5; border: 1px solid #6EE7B7; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <p style="margin: 0 0 8px; color: #065F46; font-weight: bold;">💬 Admin ka Jawab:</p>
              <p style="margin: 0; color: #064E3B; line-height: 1.6;">${adminReply}</p>
            </div>

            <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/dashboard" 
               style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 8px;">
              Dashboard Mein Dekho →
            </a>
          </div>

          <div style="background: #F3F4F6; padding: 16px; text-align: center;">
            <p style="margin: 0; color: #9CA3AF; font-size: 12px;">Solvix Support Team | Koi aur masla ho to dobara submit karein</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ User ko email bheji: ${userEmail}`);
    return true;
  } catch (error) {
    console.error('❌ User email error:', error.message);
    return false;
  }
};

module.exports = {
  notifyAdminNewProblem,
  notifyUserProblemSolved
};