const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");
require("dotenv").config(); // ✅ Load .env variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Optional: Debug to verify .env is loading
console.log("✅ TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID ? "Loaded" : "Missing");
console.log("✅ TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "Loaded" : "Missing");
console.log("✅ TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER ? "Loaded" : "Missing");

// ✅ Twilio client setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Order endpoint - sends SMS
app.post("/order", async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({
      success: false,
      error: "Phone and message are required.",
    });
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // ✅ Must be a verified or purchased Twilio number
      to: phone,
    });

    return res.status(200).json({
      success: true,
      sid: response.sid,
      message: "SMS sent successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
