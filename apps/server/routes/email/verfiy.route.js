const route = require('express').Router()
const prisma = require("../../prisma/prisma.js");
const nodemailer = require('nodemailer')
const {email} = require("./email")
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
    auth: {
          user: 'abhishekbhatta02@gmail.com',
          pass: 'leoquwmgdxaqzoms',
      },
  secure: true, // true for 465, false for other ports
});

route.post("/",(req,res) => {
  const mailData = {
    from: 'abhishekbhatta02@gmail.com',  // sender address
    to: req.body.to,   // list of receivers
    subject: "Email Verification | Lekhakh",// plain text body
    text: 'For clients with plaintext support only',
    html: email
  };

  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      res.status(200).json({message:"Email sent"})
  });
})

module.exports = route;