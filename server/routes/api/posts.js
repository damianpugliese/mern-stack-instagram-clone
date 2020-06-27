const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const Post = require('../../models/post');

router.get('/allPosts', (req, res) => {
    Post.find()
        .populate('postedBy', '_id username')
        .then(posts => res.json({ posts }))
        .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));
});

router.get('/userPosts', auth, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate('postedBy', '_id username')
        .then(userPosts => res.json({ userPosts }))
        .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));
});

router.post('/newPost', auth, (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ msg: 'Please add all fields' });

    const newPost = new Post({
        title,
        body,
        postedBy: req.user
    });

    newPost.save()
        .then(post => res.json({ post }))
        .catch(() => res.status(400).json({ msg: 'Oops! Something went wrong. Please try again' }));

});

module.exports = router;