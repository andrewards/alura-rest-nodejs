const connection = require('../infraestrutura/connection');
const uploadFile = require('../infraestrutura/arquivos/uploads');

class Pets {

    create(pet, res) {

        const q = 'INSERT INTO pets SET ?';

        uploadFile(pet.imagem, pet.nome.toLowerCase(), (error, dest) => {
            if (error) res.status(400).json({error});
            else {
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
            }

        });

    }

}

module.exports = new Pets;