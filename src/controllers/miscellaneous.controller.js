const { flushRedis } = require("../utils/redis.util");

async function flushRedisController (req, res) {
  try {
    await flushRedis();
    res.status(200).json({ message: 'Redis cache flushed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to flush Redis', error: error.message });
  }
};

module.exports = {
    flushRedisController
};