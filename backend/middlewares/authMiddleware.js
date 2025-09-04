import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        // Check for token in multiple locations
        const token = req.cookies?.token || 
                     req.headers?.authorization?.replace('Bearer ', '') || 
                     req.body?.token;
        
        console.log('Auth Debug - Token received:', token ? 'Yes' : 'No');
        console.log('Auth Debug - Cookies:', req.cookies);
        console.log('Auth Debug - Headers:', req.headers.authorization);

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Not authorized, no token provided" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded.id;
        
        console.log('Auth Debug - Token decoded successfully for admin ID:', decoded.id);
        next();
        
    } catch (err) {
        console.error("Auth error details:", err.name, err.message);
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false,
                message: "Invalid token format" 
            });
        }
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: "Token expired, please login again" 
            });
        }

        res.status(401).json({ 
            success: false,
            message: "Authentication failed" 
        });
    }
};