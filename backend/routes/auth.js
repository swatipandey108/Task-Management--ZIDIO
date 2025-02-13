const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, "tcmTM");

        // Log received token and decoded data for debugging
        console.log("Received Token:", token);
        console.log("Decoded Token Data:", decoded);

        // Ensure `authClaims` exists and is an array
        if (!decoded.authClaims || !Array.isArray(decoded.authClaims) || decoded.authClaims.length === 0) {
            return res.status(401).json({ message: "Invalid token structure" });
        }

        req.user = decoded; // Store entire decoded token for future use
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = { authenticateToken };
