const axios = require('axios');
const moment = require('moment');
const connection = require('../infraestrutura/database/connection');

class Atendimentos {

    create(atendimento, res) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const validacoes = [
            {
                nome: 'data',
                valido: moment(data).isAfter(moment()),
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
                else res.status(201).json({id: result.insertId, ...atendimentoDatado});
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

        connection.query(q, async (err, result) => {
            const atendimento = result[0];

            const cpf = atendimento.cliente;

            if (err) res.status(400).json(err);
            else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                res.status(200).json(atendimento);
            }
        });
    }

    update(id, valores, res) {
        
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const q = 'UPDATE atendimentos SET ? WHERE id=?';

        connection.query(q, [valores, id], (err, result) => {
            if (err) res.status(400).json(err);
            else res.status(200).json({...valores, id});
        });
    }

    delete(id, res) {
        const q = 'DELETE FROM atendimentos WHERE id=?';

        connection.query(q, id, (err, results) => {
            if (err) res.status(400).json(err);
            else res.status(200).json({ deletedId: id });
        });
    }

}

module.exports = new Atendimentos;