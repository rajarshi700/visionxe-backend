// src/app.js
const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const rateLimiter = require('./middlewares/rateLimiting.middleware');  // ← your rate-limit logic
const allRoutes   = require('./routes/all.route');

const app = express();

// ── TRUST PROXY ──
// So that req.ip reflects the real client IP (from X-Forwarded-For)
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// ── RATE LIMITER ──
// Apply to every incoming request before your routes
app.use(rateLimiter);

// ── YOUR ROUTES ──
app.use('/api', allRoutes);

module.exports = app;
