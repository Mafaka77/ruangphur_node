const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next();
    } catch (error) {
        res.status(200).json({ message: "Invalid Token" ,status:400});
    }
};

// Middleware to check if user has a specific role
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
        }
        next();
    };
};
