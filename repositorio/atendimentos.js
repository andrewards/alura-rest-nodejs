const query = require('../infraestrutura/database/queries');

class Atendimentos {

    create(atendimento) {
        const q = "INSERT INTO atendimentos SET ?";
        return query(q, atendimento);
    }

}

module.exports = new Atendimentos;