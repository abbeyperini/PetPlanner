const models = require('../models');

class PetController {
    createPet = (req, res) => {
        let name = req.body.name;
        let favorites = req.body.favorites;
        let user = req.body.user;
        // let published = '';

        // if (req.body.published == "true") {
        //     published = true;
        // } else {
        //     published = false;
        // };

        let pet = models.pets.build({
            name: name,
            favorites: favorites,
            user_id: user
            // isPublished: published
        });

        pet.save().then((pet) => {
            res.json(pet)
        }).catch((error) => {
            console.log(error)
        })
    }

    deletePet = (req, res) => {
        let petId = req.params.id;

        models.pets.destroy({
            where: {
                id: petId
            }
        }).then(deletedPet => {
            res.json(deletedPet)
        })
    }

    getPet = (req, res) => {
        let petId = req.params.id;

        models.pets.findByPk(petId).then(pet => {
            res.json(pet)
        })
    }

    editPet = (req, res) => {
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
    }
}

module.exports = PetController;