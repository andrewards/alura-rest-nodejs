const axios = require('axios');
const Atendimentos = require('../models/atendimentos');

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Atendimentos.read()
            .then(results => res.json(results))
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimentos.searchForID(id)
            .then(async result => {
                const atendimento = result[0];
                const cpf = atendimento.cliente;

                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;

                res.json(atendimento);
            })
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimentos.create(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimentos.update(id, valores)
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimentos.delete(id)
            .then(result => res.json(result))
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    });

}