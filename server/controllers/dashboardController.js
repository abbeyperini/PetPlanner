const models =  require('../models');

class DashboardController {
    getAll = (req, res) => {
        models.pets.findAll()
        .then( pets => {
            res.json(pets)
        }).catch(error => {console.log(error)})
    }

    getUser = (req, res) => {
        let userId = req.params.id;
    
        models.pets.findAll({
            where: {
                user_id: userId
            }
        }).then( pets => {
            res.json(pets)
        })
    }  
}

module.exports = DashboardController