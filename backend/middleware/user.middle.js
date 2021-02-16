const jwt = require('jsonwebtoken');

const {JWT_SECRET='123abc'} = process.env

exports.loggedIn = (req, res, next) => {
    if (req.cookies['uid.session']) { 
        let user = jwt.verify(req.cookies['uid.session'], JWT_SECRET)
        if (user) {
            req.user = user;
            return next();
        }
    }
    return res.status(401).json({
        message: 'Not Authorized'
    })
}