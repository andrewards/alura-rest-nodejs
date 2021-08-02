const Atendimentos = require('../models/atendimentos');

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        res.send('Você está na rota de atendimentos e está realizando um GET!');
    });

    app.post('/atendimentos', (req, res) => {

        const atendimento = req.body;
        Atendimentos.create(atendimento, res);
        console.log(req.body);

    });

}