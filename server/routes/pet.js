const express =  require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');
const cors = require('cors');
const PetController = require('../controllers/petController');
const petController = new PetController;

module.exports = router;
router.use(cors());
router.use(express.json());

router.post('/create-pet', petController.createPet)

router.delete('/delete/:id', petController.deletePet)

router.get('/edit/:id', petController.getPet)

router.post('/edit-pet', petController.editPet)
