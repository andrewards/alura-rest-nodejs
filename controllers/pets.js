const Pets = require('../models/pets');

module.exports = app => {

    app.post('/pets', (req, res) => {
        Pets.create(req.body, res);
    });

}