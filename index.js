require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sendEmail = require("./api/send-email");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://boxpalpro.com",
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.options("/api/send-email", cors());

app.post("/api/send-email", sendEmail);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
