const redis = require('../config/redis.config');

const WINDOW = 60;
const LIMIT  = 100;

module.exports = async (req, res, next) => {
  const id  = req.ip;
  const key = `ratelimit:${id}`;

  try {
    const current = await redis.incr(key);
    if (current === 1) await redis.expire(key, WINDOW);
    if (current > LIMIT) {
      return res.status(429).json({ error: 'Too many requests.' });
    }
    next();
  } catch (err) {
    console.error('Rate limiter error:', err);
    next();
  }
};
