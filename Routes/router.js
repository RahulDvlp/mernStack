const express = require("express");
const router = new express.Router();
const users = require("../models/userSchema");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

router.post("/register", async (req, res) => {
  const { fname, lname, email, mobile, message } = req.body;

  if (!fname || !lname || !email || !mobile) {
    res.status(401).json({ status: 401, error: "All input required" });
  }
  try {
    const preUser = await users.findOne({ email: email });
    if (preUser) {
      const userMessage = preUser.Messagesave(message);
      console.log(userMessage);
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Regarding your submission on hike !t",
        text: "Your Response has been Submitted",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error: " + error);
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });
    } else {
      const finalUser = new users({
        fname,
        lname,
        email,
        mobile,
        message,
      });

      const storeData = await finalUser.save();

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Regarding your submission on hike !t",
        text: "Your Response has been Submitted",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error: " + error);
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error: "All input required" });
    console.log("Error occured");
  }
});

module.exports = router;
