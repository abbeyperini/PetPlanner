const models =  require('../models');

class DashboardController {
    getAll = (req, res) => {
        models.pets.findAll()
        .then( pets => {
            res.json(pets)
        }).catch(error => {console.log(error)})
    }

    
}

module.exports = DashboardController