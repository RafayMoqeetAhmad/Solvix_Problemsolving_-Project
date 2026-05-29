const AI_SUGGESTIONS = {
  'Hardware': [
    'Restart your device and check if the issue persists',
    'Verify all cable connections are secure',
    'Update software/drivers to the latest version',
    'Clear cache and temporary files',
    'Run a full system diagnostic or antivirus scan'
  ],
  'Software': [
    'Restart your device and check if the issue persists',
    'Update software/drivers to the latest version',
    'Clear cache and temporary files',
    'Run a full system diagnostic or antivirus scan',
    'Reinstall the application if the issue persists'
  ],
  'Network': [
    'Restart your router and modem by unplugging for 30 seconds',
    'Verify all cable connections are secure',
    'Update network adapter drivers to the latest version',
    'Clear DNS cache and reset network settings',
    'Contact your ISP if the issue persists after all steps'
  ],
  'Printer': [
    'Check the power supply and ensure the device is properly plugged in',
    'Clean filters and vents regularly for optimal performance',
    'Use appropriate cleaning products for the specific material',
    'Follow manufacturer instructions and safety guidelines',
    'Perform regular maintenance to prevent future issues'
  ],
  'Email': [
    'Create a detailed outline before starting to write',
    'Use clear, concise, and simple language',
    'Proofread carefully for grammar and spelling errors',
    'Get feedback from others before finalizing',
    'Practice regularly to improve your writing skills'
  ],
  'Security': [
    'Create a detailed budget tracking income and expenses',
    'Set up automatic savings transfers',
    'Review and categorize all spending monthly',
    'Research and compare options before major purchases',
    'Consult with a financial advisor for complex situations'
  ],
  'Other': [
    'Clearly define the problem and desired outcome',
    'Research similar situations and solutions',
    'Break the problem into smaller, manageable steps',
    'Seek advice from experienced individuals',
    'Test solutions on a small scale before full implementation'
  ]
};

const generateAISolution = (category, title, description) => {
  // Get category-specific suggestions or use 'Other' as default
  const suggestions = AI_SUGGESTIONS[category] || AI_SUGGESTIONS['Other'];

  // Generate solution
  const solution = {
    type: 'ai',
    steps: suggestions,
    additionalInfo: `If the issue persists after following these steps, consider seeking expert consultation. The solution has been generated based on common best practices for ${category} problems.`,
    providedAt: new Date()
  };

  return solution;
};

module.exports = {
  generateAISolution,
  AI_SUGGESTIONS
};