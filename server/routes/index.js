const express =  require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const bcrypt = require('bcryptjs');
const models = require('../models');
const { Op } = require('sequelize');
const cors = require('cors');
const IndexController = require('../controllers/indexController');
const indexController = new IndexController();

module.exports = router;
app.use('/styles', express.static('styles'));
router.use(cors());
router.use(express.json());

router.post('/register/user', indexController.indexRegister)

router.post('/login', indexController.indexLogin)