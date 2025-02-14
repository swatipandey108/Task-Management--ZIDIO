const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "tcmTM"); // Secret key must match login token

        console.log("Decoded Token Data:", decoded); // Debugging

        if (!decoded.userId) {  // Ensure `userId` is used
            return res.status(401).json({ message: "Invalid token structure: User ID missing" });
        }

        req.user = { id: decoded.userId, username: decoded.username };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = { authenticateToken };
