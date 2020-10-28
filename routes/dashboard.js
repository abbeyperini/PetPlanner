const express =  require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
module.exports = router;
app.use('/styles', express.static('styles'));

router.get('/', (req, res) => {
   let userId = req.session.userId;
   console.log(userId)
   models.pets.findAll({
      where: {
         userid: userId
      }
   })
   .then( pets => {
        res.render('dashboard', {pets: pets})
   })
})

router.get('/community', (req, res) => {
   models.pets.findAll({
      where: {
         isPublished: true
      }
   })
   .then( pets => {
        res.render('community', {pets: pets})
   })
})