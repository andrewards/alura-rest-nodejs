const connection = require('../infraestrutura/connection');

class Atendimentos {

    create(atendimento, res) {
        
        const q = "INSERT INTO atendimentos SET ?";

        const dataCriacao = new Date();
        const data = new Date(atendimento.data);
        const atendimentoDatado = {...atendimento, dataCriacao, data};

        connection.query(q, atendimentoDatado, (err, result) => {
            if (err) res.status(400).json(err);
            else res.status(201).json(result);
        });

    }

}

module.exports = new Atendimentos;