import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: [/^http:\/\/localhost:\d+$/], methods: ['POST', 'OPTIONS'] }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || 'false') === 'true',
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
});

app.post('/api/send-booking', async (req, res) => {
  try {
    const { booking, pricing } = req.body || {};
    if (!booking || !pricing) {
      return res.status(400).json({ error: 'Missing booking or pricing' });
    }

    const digits = (booking.cardNumber || '').replace(/\D/g, '');
    const maskedCard = digits ? digits.replace(/.(?=.{4})/g, '*') : 'N/A';

    const text = `New Booking Request\n\n` +
`Dates: ${booking.checkIn} to ${booking.checkOut} (${pricing.nights} nights)\n` +
`Room: ${booking.roomType}, Smoking: ${booking.smokingPreference}, Guests: ${booking.guests}\n\n` +
`Guest:\n` +
`Name: ${booking.firstName} ${booking.lastName}\n` +
`Email: ${booking.email}\n` +
`Phone: ${booking.phone}\n` +
`Special Requests: ${booking.specialRequests || 'None'}\n\n` +
`Pricing:\n` +
`Base: $${pricing.baseAmount.toFixed(2)}\n` +
`Extras: $${pricing.extraGuestsAmount.toFixed(2)}\n` +
`Subtotal: $${pricing.subtotal.toFixed(2)}\n` +
`Tax: $${pricing.tax.toFixed(2)}\n` +
`Total: $${pricing.total.toFixed(2)}\n\n` +
`Payment (masked):\n` +
`Name on Card: ${booking.cardName || 'N/A'}\n` +
`Card Number: ${maskedCard}\n` +
`CVV: (not stored)\n` +
`Expiry: ${booking.cardExpiry || 'N/A'}\n`;

    const guestEmail = booking.email || process.env.EMAIL_FROM || process.env.SMTP_USER;
    if (!guestEmail) {
      return res.status(400).json({ error: 'Guest email is required to send booking details' });
    }

    const mailOpts = {
      from: guestEmail,
      replyTo: guestEmail,
      to: 'exeinnbaker@gmail.com',
      subject: 'New Booking Request',
      text,
    };

    await transporter.sendMail(mailOpts);
    res.json({ ok: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ error: 'Email send failed' });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Email server running on http://localhost:${port}`);
});
