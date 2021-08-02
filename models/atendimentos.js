const connection = require('../infraestrutura/connection');

class Atendimentos {

    create(atendimento) {
        
        const q = "INSERT INTO atendimentos SET ?";

        const dataCriacao = new Date();
        const data = new Date(atendimento.data);
        const atendimentoDatado = {...atendimento, dataCriacao, data};

        connection.query(q, atendimentoDatado, (err, result) => {
            if (err) console.log(err);
            else console.log(result);
        });

    }

}

module.exports = new Atendimentos;