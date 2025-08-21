// customMiddleware.js
const addRequestTime = (req, res, next) => {
    // Add a new property to the request object
    req.requestTime = new Date().toLocaleString();

    // Call next() to pass control to the next middleware function
    next();
};

module.exports = addRequestTime;
