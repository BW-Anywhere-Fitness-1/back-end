const sendMail = require("mail-sender");
const mailjet = require("node-mailjet").connect(
  process.env.MAIL_USER,
  process.env.MAIL_PASSWORD
);

module.exports = (to, subject, data) => {
  if (process.env.NODE_ENV === "test") {
    return false;
  }
  return new Promise((resolve, reject) => {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
            Name: "Any-Fitness.com",
          },
          To: [
            {
              Email: to,
              Name: "Any-Fitness.com User",
            },
          ],
          Subject: subject,
          HTMLPart: `Hello! <br /><br />You receive this email because you 
            request an invitation to join our instructors team in an-fitness.com. 
            <br />Please enter the authentication code below when you signup in our website:
            <br /><br /><b>${data.code}</b> <br /><br />Thanks,`,
        },
      ],
    });
    request
      .then((result) => resolve(result.body))
      .catch((err) => {
        reject(err);
      });
  });
};
