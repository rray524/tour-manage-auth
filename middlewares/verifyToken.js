const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: "failed",
                error: "you are not logged in",
            })
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: "Invalid token",
        })
    }
}