const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) return res.status(400).json({ msg: 'All fields are required' });
    if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ msg: 'Invalid email address' });
    if (password !== confirmPassword) return res.status(400).json({ msg: 'Passwords do not match' });

    const usernameInUse = await User.findOne({ username });
    if (usernameInUse) return res.status(400).json({ msg: 'Username already exists' });

    const emailInUse = await User.findOne({ email });
    if (emailInUse) return res.status(400).json({ msg: 'Email already exists' });

    try {

        let hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        newUser.save()
            .then(() => {
                res.status(200).json({ msg: 'User succesfully created' });
            })
            .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));
        
    } catch (error) {

        res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' });

    }
    
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: 'All fields are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    try {
        
        let isMatch = await bcrypt.compare(password, user.password)

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

    } catch (error) {
        
        res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' });
        
    }

}

module.exports = {
    signup,
    login
}