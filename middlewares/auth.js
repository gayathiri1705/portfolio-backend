const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.JWT_SECRET || 'your_super_secret_jwt_key_here'
        );

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = auth;
