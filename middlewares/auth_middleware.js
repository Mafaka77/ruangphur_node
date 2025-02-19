const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(200).json({ message: "Access Denied. No Token Provided.",status:401 });
    }
    next();
};

