const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class IndexController {

    indexRegister = (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {
            models.Users.findOne({
                where: {
                    username: username
                }
            }).then(user => {
                if (user) {
                    res.json({userAdded: false})
                } else {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt, function(err, hash) {
                        
                        let user = models.Users.build({
                            username: username,
                            password: hash
                        })
            
                        user.save().then((savedUser) => {
                            res.json({userAdded: true, user: user.id})
                        }).catch((error) => {
                            console.log(error)
                        })
                        
                        })
                    })
                }
            })
        }
    }

    indexLogin = (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        
        if (username && password) {
            models.Users.findOne({
                where: {
                    username: username
                }
            }).then(user => {

                if (user === null) {
                    res.json({login: false})
                } else {
                    let storedPassword = user.password;
                    
                    bcrypt.compare(password, storedPassword)
                    .then((result) => {
                        const token = jwt.sign({ userId: user.id}, 'SECRETKEY')
                        res.json({login: true, token: token, user: user.id})
                    })
                    .catch((error) => {
                        res.json({login: false, error: error})
                    })
                }
            })
        }
    }
}

module.exports = IndexController;