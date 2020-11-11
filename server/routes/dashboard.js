const express =  require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');
const cors = require('cors');

router.use(cors());
module.exports = router;

// router.get('/', (req, res) => {
//    let userId = req.session.userId;

//    models.pets.findAll({
//       where: {
//          user_id: userId
//       }
//    }).then( pets => {
//         res.json(pets)
//    })
// })

router.get('/community', (req, res) => {
   models.pets.findAll()
   .then( pets => {
        res.json(pets)
   }).catch(error => {console.log(error)})
})

// router.get('/pet-care/:id', (req, res) => {
//    let petId = req.params.id;
//    req.session.petId = petId;

//    models.pets.findByPk(petId, {
//        include: [
//            {
//                model: models.Providers,
//                as: 'providers'
//            }
//        ]
//    }).then(pet => {

//        res.render('petcare', {pets: pet})
//    })
// })

// router.post('/add-care', (req, res) => {
//    let petId = req.body.id;
//    let service = req.body.service;
//    let name = req.body.name;
//    let number = req.body.number;

//    let provider = models.Providers.build({
//        name: name,
//        number: number,
//        service: service,
//        pet_id: petId
//    })

//    provider.save().then(
//            res.redirect(`/dashboard/pet-care/${petId}`)
//        )
// })

// router.post('/delete-care', (req, res) => {
//    let provideId = req.body.id;
//    let petId = req.session.petId;
//    req.session.petId = null;
   
//    models.Providers.destroy({
//       where: {
//           id: provideId
//       }
//    }).then(
//       res.redirect(`/dashboard/pet-care/${petId}`)
//   )

// })