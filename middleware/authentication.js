import jwt from 'jsonwebtoken';
const  JWT_SECRET  = "Anony6545@";

const authentication = (req, res, next) => {
    // Get the token from the request headers or query parameters
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized: Token not provided' });
    }

    try {
        // Verify the token using your JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Attach the user object to the request for further use
        next(); // Call the next middleware
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
    }
};

export {authentication};
