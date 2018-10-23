const nodemailer = require("nodemailer");
const config = require("../../../config");

const transporter = nodemailer.createTransport({
  host: config.get("mail:host"),
  auth: {
    user: config.get("mail:email"),
    pass: config.get("mail:password")
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

module.exports = transporter;
