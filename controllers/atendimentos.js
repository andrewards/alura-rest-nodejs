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

        Atendimentos.create(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(err => {
                res.status(400).json({
                    error: "Erro!"
                });
            });
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimentos.update(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimentos.delete(id, res);
    });

}