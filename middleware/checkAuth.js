const jwt = require('jsonwebtoken');
// const db = require('./connection');
require('dotenv').config()
module.exports = async (req, res, next) => {
    const token = req.body.userToken;
    if (!token) {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
};