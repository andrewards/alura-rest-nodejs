const connection = require('../infraestrutura/connection');

class Atendimentos {

    create(atendimento, res) {

        const dataCriacao = new Date();
        const data = new Date(atendimento.data);

        const validacoes = [
            {
                nome: 'data',
                valido: data.getTime() > dataCriacao.getTime(),
                mensagem: 'Informe uma data futura',
            },
            {
                nome: 'cliente',
                valido: atendimento.cliente.length >= 5,
                mensagem: 'O cliente deve ter pelo menos 5 caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros);
        } else {

            const atendimentoDatado = {...atendimento, dataCriacao, data};

            const q = "INSERT INTO atendimentos SET ?";
            connection.query(q, atendimentoDatado, (err, result) => {
                if (err) res.status(400).json(err);
                else res.status(201).json(result);
            });

        }

    }

    read(res) {

        const q = 'SELECT * FROM atendimentos';

        connection.query(q, (err, results) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(results);
        });

    }

    searchForID(id, res) {
        const q = `SELECT * FROM atendimentos WHERE id=${id}`;

        connection.query(q, (err, result) => {
            const atendimento = result[0];
            if (err) res.status(400).json(err);
            else res.status(200).json(atendimento);
        });
    }

}

module.exports = new Atendimentos;