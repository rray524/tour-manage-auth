module.exports = (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!role.includes(userRole)) {
            return res.status(403).json({
                status: "failed",
                error: "you are not authorized",
            })
        }

        next();
    }
}