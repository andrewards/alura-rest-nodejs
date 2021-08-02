const connection = require('../infraestrutura/connection');
const uploadFile = require('../arquivos/uploads');

class Pets {

    create(pet, res) {

        const q = 'INSERT INTO pets SET ?';

        uploadFile(pet.imagem, pet.nome.toLowerCase(), dest => {

            connection.query(q, {
                nome: pet.nome,
                imagem: dest,
            }, (err, result) => {
                if (err) res.status(400).json(err);
                else res.status(201).json({
                    id: result.insertId,
                    nome: pet.nome,
                    imagem: dest,
                });
            });

        });

    }

}

module.exports = new Pets;