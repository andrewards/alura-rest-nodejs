const connection = require('../infraestrutura/connection');

class Pets {

    create(pet, res) {

        const q = 'INSERT INTO pets SET ?';

        connection.query(q, pet, (err, result) => {
            if (err) res.status(400).json(err);
            else res.status(201).json({
                id: result.insertId,
                ...pet,
            });
        });

    }

}

module.exports = new Pets;