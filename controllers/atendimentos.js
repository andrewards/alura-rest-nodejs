const Atendimentos = require('../models/atendimentos');

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Atendimentos.read(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimentos.searchForID(id, res);
    });

    app.post('/atendimentos', (req, res) => {

        const atendimento = req.body;
        Atendimentos.create(atendimento, res);
        console.log(req.body);

    });

}