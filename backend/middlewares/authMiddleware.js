import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded.id;
        next();
    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};
