// removed authentication middleware and import and secrets import for session while adding React
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const indexRoutes = require('./routes/index.js');
const dashRoutes = require('./routes/dashboard');
const petRoutes = require('./routes/pet.js');
const {v4: uuidv4} = require('uuid');
const { dirname } = require('path');
const VIEWS_PATH = path.join(__dirname, '/views');
const bcrypt = require('bcryptjs');
const models = require('./models');
const { Op } = require('sequelize');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
// app.use('/index', indexRoutes);
app.use('/dashboard', dashRoutes);
app.use('/pet', petRoutes);
app.use(cors())

app.get('/', (req, res) => {
    res.redirect('/dashboard/community');
});

app.listen(8080, () => {
    console.log("Server is running...");
});