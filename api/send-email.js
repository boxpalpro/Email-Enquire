require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // ✅ Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://boxpalpro.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, company, products, email, phone, state } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
const buildField = (label, value, isEmail = false) => {
  if (!value) return "";
  if (isEmail) {
    return `<p style="font-size: 16px;"><strong>${label}:</strong> <a href="mailto:${value}" style="color: #007bff; text-decoration: none;">${value}</a></p>`;
  }
  return `<p style="font-size: 16px;"><strong>${label}:</strong> ${value}</p>`;
};
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "boxpalpro@gmail.com",
    subject: "New Bulk Order Enquiry",
    html: `
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="background: #007bff; color: white; padding: 10px; text-align: center; border-radius: 5px;">New Bulk Order Enquiry</h2>
        <div style="padding: 15px;">
            ${buildField("Name", name)}
            ${buildField("Company", company)}
            ${buildField("Number of Products", products)}
            ${buildField("Email", email, true)}
            ${buildField("Phone", phone)}
            ${buildField("State", state)}
        </div>
        ${
          email
            ? `<div style="text-align: center; margin-top: 20px;">
                <a href="mailto:${email}" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Enquiry</a>
              </div>`
            : ""
        }
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ success: false, message: "Failed to send email.", error: error.message });
  }
};
