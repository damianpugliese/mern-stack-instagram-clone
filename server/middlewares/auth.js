const { JWT_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: 'Authorization denied' });

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(400).json({ msg: 'Token is not valid' });

        const { id } = payload;

        User.findById(id)
            .select('-password -registerDate -__v')
            .then(user => {
                req.user = user
                next();
            });
    });

}

module.exports = auth;