const jwt = require('jsonwebtoken');
const models = require('./models');

function authenticate(req, res, next) {
    let headers = req.headers['authorization'];

    if (headers) {
        const token = headers.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRETKEY');
        if(decoded) {
            const userId = decoded.userId;
            models.Users.findOne({
                where: {
                    id: userId
                }
            }).then((user) => {
                if (user) {
                    next()
                } else {
                    res.json({error: 'unauthorized access'})
                }
            })
        }
    } else {
        res.json({error: 'Authorization header not found'})
    }
}

module.exports = authenticate;