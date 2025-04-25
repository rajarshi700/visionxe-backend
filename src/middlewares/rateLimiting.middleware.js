const redis = require('../config/redis.config');

const WINDOW = 60; // 60 seconds
const LIMIT = 100; // Max 100 requests per window

module.exports = async (req, res, next) => {
  const id = req.headers['x-forwarded-for'] || req.ip;
  const key = `ratelimit:${id}`;

  try {
    const current = await redis.incr(key);

    // First request → set expiry
    if (current === 1) {
      await redis.expire(key, WINDOW);
    }

    // If over limit → block
    if (current > LIMIT) {
      console.warn(`[RATE LIMIT BLOCKED] IP: ${id} exceeded limit (${LIMIT})`);
      return res.status(429).json({ error: 'Too many requests.' });
    }

    next();
  } catch (err) {
    console.error('[RATE LIMIT ERROR]', err);
    next();
  }
};
