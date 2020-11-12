const express =  require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');
const cors = require('cors');

module.exports = router;
router.use(cors());
router.use(express.json());

router.post('/create-pet', (req, res) => {
    let name = req.body.name;
    let favorites = req.body.favorites;
    let published = '';

    if (req.body.published == "true") {
        published = true;
    } else {
        published = false;
    };

    let pet = models.pets.build({
        name: name,
        favorites: favorites,
        isPublished: published
    });

    pet.save().then((pet) => {
        res.json(pet)
    }).catch((error) => {
        console.log(error)
    })
})

router.delete('/delete/:id', (req,res) => {
    let petId = req.params.id;

    models.pets.destroy({
        where: {
            id: petId
        }
    }).then(deletedPet => {
        res.json(deletedPet)
    })
})

router.get('/edit/:id', (req, res) => {
    let petId = req.params.id;
    models.pets.findByPk(petId).then(pet => {
        res.json(pet)
    })
})

router.post('/edit-pet', (req, res) => {
    let petId = req.body.id;
    let name = req.body.name;
    let favorites = req.body.favorites;
    // let published = '';

    // if (req.body.published == "true") {
    //     published = true;
    // } else {
    //     published = false;
    // };

    models.pets.update({
        name: name,
        favorites: favorites,
        // isPublished: published
    }, {
        where: {
            id: petId
        }
    }).then(updatedPet => {
        res.json(updatedPet)
    })
})
