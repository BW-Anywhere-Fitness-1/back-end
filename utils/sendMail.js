const sendMail = require("mail-sender");

module.exports = (to, subject, data) => {
  return sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    template: `
        Hello! \n\n
        You receive this email because you 
        request an invitation to join our instructors team in anywhere-fitness.com\n
        Please enter the authentication code below when you signup in our website: \n\n
        ${data}\n\n
        Thanks,
        `,
    data: {},
  });
};
