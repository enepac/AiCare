const nodemailer = require("nodemailer");

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "enrico.acha.ca@gmail.com",
      pass: "wntkymvywuctlgrf", // Use your actual App Password here
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"AiCare Support" <enrico.acha.ca@gmail.com>',
      to: "your-email@example.com", // Replace with your email to test
      subject: "SMTP Test - AiCare",
      text: "This is a test email to confirm SMTP is working.",
    });

    console.log("✅ Email sent successfully!", info);
  } catch (error) {
    console.error("❌ SMTP Error:", error);
  }
}

testSMTP();
