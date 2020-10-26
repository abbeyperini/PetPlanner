const e = require('express');
const express =  require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const router = express.Router();
const db = require('../database');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
module.exports = router;
app.use('/styles', express.static('styles'));

router.get('/add-pet', (req, res) => {
    res.render('createPet')
})

router.post('/create-pet', (req, res) => {
    let petname = req.body.petname;
    let foodbrand = req.body.foodbrand;
    let amount = req.body.amount;
    let perday = req.body.perday;
    let favorites = req.body.favorites;
    let published = '';
    let username = req.session.username;
    let imageurl = req.body.imageurl;
    if (req.body.published == "true") {
        published = true;
    } else {
        published = false;
    };
    
    db.none('INSERT INTO pets(petname, foodbrand, amount, perday, favorites, published, imageurl, username) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', 
    [petname, foodbrand, amount, perday, favorites, published, imageurl, username])
    .then(
        res.redirect('/dashboard')
    ).catch((error) => console.log(error))
})

router.get('/community', (req, res) => {
    db.any('SELECT petname, imageurl, favorites FROM pets')
    .then(result => {
        res.render('community', {pets: result});
    }).catch((error) => console.log(error))
})

router.post('/delete', (req, res) => {
    let petid = req.body.petid;

    db.none('DELETE from pets WHERE petid = $1', [petid])
    .then(() => {
        console.log('DELETED')
        res.redirect('/dashboard')
    })
})

router.post('/edit', (req, res) => {
    let petid = req.body.petid;

    db.any('SELECT petid, petname, foodbrand, amount, perday, published, imageurl, favorites, datecreate, dateupdate FROM pets WHERE petid = $1', [petid])
    .then(result => {
        res.render('editPet', {pets: result});
    }).catch((error) => console.log(error))
})

router.post('/edit-pet/petname', (req, res) => {
    let petid = req.body.petid;
    let petname = req.body.petname;
    
    db.none('UPDATE pets SET petname = $1 WHERE petid = $2', [petname, petid])
    .then(() => {
        db.any('SELECT petid, petname, foodbrand, amount, perday, published, imageurl, favorites, datecreate, dateupdate FROM pets WHERE petid = $1', [petid])
        .then(result => {
            res.render('editPet', {pets: result});
        }).catch((error) => console.log(error))
    }).catch((error) => console.log(error));
});

router.post('/edit-pet/foodbrand', (req, res) => {
    let petid = req.body.petid;
    let foodbrand = req.body.foodbrand;

    db.none('UPDATE pets SET foodbrand = $1 WHERE petid = $2', [foodbrand, petid])
    .then(() => {
        res.redirect('/edit')
    }).catch((error) => console.log(error));
})

router.post('/edit-pet/amount', (req, res) => {
    let petid = req.body.petid;
    let amount = req.body.amount;

    db.none('UPDATE pets SET amount = $1 WHERE petid = $2', [amount, petid])
    .then(() => {
        res.redirect('/edit')
    }).catch((error) => console.log(error));
})

router.post('/edit-pet/perday', (req, res) => {
    let petid = req.body.petid;
    let perday = req.body.perday;

    db.none('UPDATE pets SET perday = $1 WHERE petid = $2', [perday, petid])
    .then(() => {
        res.redirect('/edit')
    }).catch((error) => console.log(error));
})

router.post('/edit-pet/favorites', (req, res) => {
    let petid = req.body.petid;
    let favorites = req.body.favorites;

    db.none('UPDATE pets SET favorites = $1 WHERE petid = $2', [favorites, petid])
    .then(() => {
        res.redirect('/edit')
    }).catch((error) => console.log(error));
})

router.post('/edit-pet/published', (req, res) => {
    let petid = req.body.petid;
    let published = '';

    if (req.body.published == "true") {
        published = true;
    } else {
        published = false;
    };

    db.none('UPDATE pets SET published = $1 WHERE petid = $2', [published, petid])
    .then(() => {
        res.redirect('/edit')
    }).catch((error) => console.log(error));
})

router.post('/edit-pet/imageurl', (req, res) => {
    let petid = req.body.petid;
    let imageurl = req.body.imageurl;

    db.none('UPDATE pets SET imageurl = $1 WHERE petid = $2', [imageurl, petid])
    .then(() => {
        res.redirect('/edit')
    }).catch((error) => console.log(error));
})

// edit resulting in error: invalid input syntax for type integer: ""