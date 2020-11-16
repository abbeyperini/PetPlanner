const models = require('../models');
const bcrypt = require('bcryptjs');

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
                        res.json({login: true, userid: user.id})
                    })
                }
            })
        }
    }
}

module.exports = IndexController;