const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = '123abc' } = process.env;

exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            req.body.password = hash
            const user = new User(req.body)
            user.save()
                .then(result => {
                    return res.status(201).json({
                        message: 'Account created successfully',
                        result: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
}

exports.login = (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(auth => {
                        if (auth) {
                            const token = jwt.sign({username: user.username, userId: user._id}, JWT_SECRET, { expiresIn: '1h'});

                            res.cookie('uid.session', token, {maxAge: 3600000, httpOnly: true, sameSite: true})

                            res.status(200).json({
                                message: 'Logged in'
                            })
                        } else {
                            res.status(401).json({
                                error: 'Username/Password is incorrect'
                            })
                        }
                    })
            } else {
                res.status(401).json({
                    error: 'Username/Password is incorrect'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}