const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// Middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Nodemailer Transporter Setup with your 16-letter App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'salasarbalajiroadlines2026@gmail.com',
        pass: 'bcqm edqh bhtq qamn' // Aapka 16-letter App Password lag gaya!
    }
});

// POST Route for Form Submission
app.post('/submit-order', (req, res) => {
    const { clientName, destination, tonnage, contactForm, requirements } = req.body;

    const mailOptions = {
        from: 'salasarbalajiroadlines2026@gmail.com',
        to: 'salasarbalajiroadlines2026@gmail.com', // Aapko khud aapke inbox mein mail aayegi
        subject: `🚨 New Bitumen Enquiry from ${clientName}`,
        text: `NEW BITUMEN ENQUIRY - SSBR\n\n` +
              `👤 Client/Company: ${clientName}\n` +
              `📍 Destination: ${destination}\n` +
              `📦 Required Tonnage: ${tonnage} MT\n` +
              `📞 Contact Mobile: ${contactForm}\n` +
              `📝 Specific Requirements: ${requirements || 'None'}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Background Email Error: ", error);
            return res.status(500).json({ success: false, message: "Email failed to send." });
        }
        console.log("Email Sent Successfully: " + info.response);
        return res.status(200).json({ success: true, message: "Email sent successfully in background!" });
    });
});

// Start Server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n=============================================================`);
    console.log(`🚀 SSBR Backend Matrix Connected Successfully!`);
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log(`=============================================================\n`);
});