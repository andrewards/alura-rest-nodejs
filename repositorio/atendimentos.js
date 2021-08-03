const query = require('../infraestrutura/database/queries');

class Atendimentos {

    create(atendimento) {
        const q = "INSERT INTO atendimentos SET ?";
        return query(q, atendimento);
    }

    read() {
        const q = 'SELECT * FROM atendimentos';
        return query(q);
    }

    searchForID(id) {
        const q = `SELECT * FROM atendimentos WHERE id=?`;
        return query(q, id);
    }

    update(id, valores) {
        const q = 'UPDATE atendimentos SET ? WHERE id=?';
        return query(q, [valores, id]);
    }

    delete(id) {
        const q = 'DELETE FROM atendimentos WHERE id=?';
        return query(q, id);
    }

}

module.exports = new Atendimentos;