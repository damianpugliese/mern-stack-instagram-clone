const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../../config/config');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({ msg: 'All fields are required' });

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            bcrypt.hash(password, 10)
                .then(hashedPassword => {

                    const newUser = new User({
                        username,
                        email,
                        password: hashedPassword
                    });

                    newUser.save()
                        .then(user => {
                            res.status(200).json({ msg: 'User succesfully created' });
                        })
                        .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));
                })
                .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));

        })
        .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: 'All fields are required' });

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {

                    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

                    jwt.sign(
                        { id: user.id },
                        JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email
                                }
                            })
                        }
                    );

                })
                .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));

        })
        .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));
});

module.exports = router;