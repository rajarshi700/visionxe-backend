const redisClient = require("../config/redis.config");

async function savePayloadToRedis({ key, keyType, value, expireTime = 3600 }) {
    await redisClient.set(`${key}:${keyType}`, value, 'EX', expireTime);
}

// Retrieve data from Redis
async function getPayloadFromRedis({ key, keyType }) {
    return await redisClient.get(`${key}:${keyType}`);
}

async function flushRedis() {
    try {
      const keysBefore = await redisClient.keys('*');
      console.log('Redis keys before flush:', keysBefore.length > 0 ? keysBefore : '[Empty]');
  
      await redisClient.flushall();
      console.log('Redis cache flushed successfully.');
  
      const keysAfter = await redisClient.keys('*');
      console.log('Redis keys after flush:', keysAfter.length > 0 ? keysAfter : '[Empty]');
    } catch (error) {
      console.error('Error while flushing Redis:', error);
    }
}
  
  

module.exports = {
    savePayloadToRedis,
    getPayloadFromRedis,
    flushRedis
};