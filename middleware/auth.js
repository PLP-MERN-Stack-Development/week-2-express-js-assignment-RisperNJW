require('dotenv').config();

function authenticateApiKey(req, res, next) {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid or missing API key' });
    }
    next();
}

module.exports = authenticateApiKey;
