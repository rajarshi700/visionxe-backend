const redisClient = require("../config/redis.config");

async function savePayloadToRedis({ key, keyType, value, expireTime = 3600 }) {
    await redisClient.set(`${key}:${keyType}`, value, 'EX', expireTime);
}

// Retrieve data from Redis
async function getPayloadFromRedis({ key, keyType }) {
    return await redisClient.get(`${key}:${keyType}`);
}

module.exports = {
    savePayloadToRedis,
    getPayloadFromRedis
};