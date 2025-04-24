const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const get = require('lodash/get');
const { savePayloadToRedis, getPayloadFromRedis } = require("../utils/redis.util");


const authenticate = (req, res, next) => {
    const token = req.body.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    jwt.verify(token, 'supersecretkey123forvisionxeclasseslms', (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ message: 'Forbidden: Only admins can access this route' });
    }
    next();
};

const deviceAuthCheck = async (req, res, next) => {
    try {
        const fingerprint = req.body?.fingerprint;
        if (!fingerprint) {
            return res.status(400).json({ message: 'Fingerprint is required' });
        }
        const userId = req.user.userId;
        const { redisFingerprint = '' } = JSON.parse(await getPayloadFromRedis({ key: userId, keyType: "fingerprint" }) ?? '{}');
        if (redisFingerprint && fingerprint !== redisFingerprint) {
            return res.status(401).json({ message: 'Unauthorized device' });
        }
        if (!redisFingerprint) {
            const userData = await User.findById(
                userId,
                {
                    fingerprint: 1,
                }
            ).lean();
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            const dbFingerprint = get(userData, "fingerprint", '');
            await savePayloadToRedis({ key: userId, keyType: "fingerprint", value: JSON.stringify({ redisFingerprint: dbFingerprint }), expireTime: 86400  });
            if (fingerprint !== dbFingerprint) {
                return res.status(401).json({ message: 'Unauthorized device' });
            }
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  


module.exports = { authenticate, isAdmin, deviceAuthCheck };