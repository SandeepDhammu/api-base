import nodemailer from "nodemailer";

export const sendMail = (toEmail, message) => {
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1ec75df2cd4a82",
      pass: "44002f3f9106c3",
    },
  });
  const mailOptions = {
    from: '"Test Server" <test@example.com>',
    to: toEmail,
    subject: "Email Test",
    text: "click on this link to reset your password: " + message,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return reject();
    }
    console.log("Info: ", info);
    res.json({
      message: "Email successfully sent.",
    });
  });
};
