const sendMail = require("mail-sender");

module.exports = (to, subject, data) => {
  if (process.env.NODE_ENV === "test") {
    return false;
  }
  return new Promise(async (resolve, reject) => {
    try {
      await sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        template: `
           Hello! <br /><br />
           You receive this email because you 
           request an invitation to join our instructors team in an-fitness.com. <br />
           Please enter the authentication code below when you signup in our website: <br /><br />
           <b>\${code}</b> <br /><br />
           Thanks,
           `,
        data,
      });
      resolve(true);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
