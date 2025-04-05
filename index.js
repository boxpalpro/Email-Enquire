require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sendEmail = require("./api/send-email"); // Import the API function

const app = express();
const PORT = process.env.PORT || 3000;

// const corsOptions = {
//     origin: "https://boxpalpro.com", // Replace with your Shopify domain
//     methods: "POST",
//     allowedHeaders: ["Content-Type"],
// };

// app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://boxpalpro.com");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});
app.use(express.json());

// Handle preflight requests
// app.options("/api/send-email", cors(corsOptions));
// Route for sending emails
app.post("/api/send-email", sendEmail);

// Start the server (for local development only)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
