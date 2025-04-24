const jwt = require("jsonwebtoken");

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

module.exports = { authenticate, isAdmin };