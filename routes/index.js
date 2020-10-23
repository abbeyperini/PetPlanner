const express =  require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const authenticate = require('../authenticate');
const bcrypt = require('bcryptjs');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
module.exports = router;
app.use('/styles', express.static('styles'));

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    // click button to register
    res.render('register');
});

router.post('/register/user', (req, res) => {
    // if authenticated, redirect to dashboard
    // if null redirect to register
    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;

        if (persistedUser(username, password)) {
            res.render('index', {message: "Username exists."})
        } else {
            const userID = uuidv4();
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        res.redirect('/register', {message: "Something went wrong."})
                    } else {
                        let user = {userID: userID, username: username, password: hash, pets: []};
                        users.push(user);

                        if (req.session) {
                            req.session.isAuthenticated = true;
                            req.session.username = username;
                            req.session.userID = userID;
                            res.redirect('/dashboard')
                        } else {
                            res.render('index', {message: "Something went wrong."})
                        }
                    };
                });
            });
        };
    } else {
        res.render('register', {message: "Please enter a new username and password."});
    };
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // verify user exists, redirect to dashboard
    const persisted = users.find(user => {
        return user.username == username;
    });

    if (persisted) {
        bcrypt.compare(password, persisted.password, function(err, result) {
            if (result) {
                if (req.session) {
                    req.session.isAuthenticated = true;
                    req.session.username = username;

                    let user = users.find(user => {
                        return user.username == username;
                    });

                    req.session.userID = user.userID;

                    res.redirect('/dashboard')
                } else {
                    res.render('index', {message: "Something went wrong."})
                }
            }
        });
    } else {
        res.render('index', {message: 'Username or password is incorrect or username does not exist.'})
    }
});

function persistedUser(username, password) {
    const persisted = users.find(user => {
        return user.username == username;
    });
    console.log(persisted)
    if (persisted) {
        bcrypt.compare(password, persisted.password, function(err, result) {
            if(result) {
                console.log(true)
                return true;
            } else {
                console.log(false)
                return false;
            }
        });
    } else {
        return false;
    };
};