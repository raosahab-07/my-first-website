const Message = require('../models/Message');
const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);

        // Setup Nodemailer
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: req.body.email,
            to: process.env.ADMIN_EMAIL,
            subject: `New Message from Portfolio: ${req.body.subject}`,
            text: `Name: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message}`,
        };

        // Send email (optional: don't wait for it to respond to user)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log('Email error:', error);
            else console.log('Email sent:', info.response);
        });

        res.status(201).json({ success: true, message: 'Message sent and stored.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.json({ message: 'Message removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
