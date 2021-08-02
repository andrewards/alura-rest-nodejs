const connection = require('../infraestrutura/connection');

class Atendimentos {

    create(atendimento) {
        
        const q = "INSERT INTO atendimentos SET ?";

        connection.query(q, atendimento, (err, result) => {
            if (err) console.log(err);
            else console.log(result);
        })

    }

}

module.exports = new Atendimentos;