const rateLimit = require('express-rate-limit');

// Rate limiter for waitlist registration
const waitlistRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many registration attempts. Please try again in 15 minutes.',
    retryAfter: 15 * 60 // seconds
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  
  // Remove custom keyGenerator - use default which handles IPv6 properly
  // keyGenerator: (req) => req.ip, // This was causing the IPv6 issue
  
  // Custom handler for when limit is exceeded
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many registration attempts from this IP. Please try again later.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000),
      limit: req.rateLimit.limit,
      remaining: req.rateLimit.remaining
    });
  },

  // Skip successful requests in rate limit counting
  skipSuccessfulRequests: false,
  
  // Skip failed requests in rate limit counting
  skipFailedRequests: true,

  // Custom skip function (optional - for whitelisting certain IPs)
  skip: (req) => {
    // Whitelist certain IPs if needed (e.g., for testing)
    const whitelist = process.env.RATE_LIMIT_WHITELIST?.split(',') || [];
    return whitelist.includes(req.ip);
  }
});

// Stricter rate limiter for general API endpoints
const generalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per minute
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Rate limit exceeded. Please slow down your requests.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

// Very strict rate limiter for admin endpoints
const adminRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: {
    success: false,
    message: 'Admin rate limit exceeded.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  waitlistRateLimit,
  generalRateLimit,
  adminRateLimit
};