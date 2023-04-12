const rateLimit = require('express-rate-limit');

const default10MinutesLimit = 10 * 60 * 1000;
const limiter = (seconds = default10MinutesLimit, maxRequest = 1) => rateLimit({
    windowMs: seconds, // minutes
    max: maxRequest, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: false,
        message: "Too many requests, please try again later.",
        statusCode: 429,
    }
});

module.exports = limiter;