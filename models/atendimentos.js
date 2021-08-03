const axios = require('axios');
const moment = require('moment');
const connection = require('../infraestrutura/database/connection');
const repositorio = require('../repositorio/atendimentos');

class Atendimentos {

    constructor() {
        this.isValidData = ({data, dataCriacao}) => moment(data).isAfter(dataCriacao);
        this.isValidCliente = (length) => length >= 5;
        this.valida = (params) => this.validacoes.filter(campo => {
            const { nome } = campo;
            const param = params[nome];

            return !campo.valido(param);
        });
        this.validacoes = [
            {
                nome: 'data',
                valido: this.isValidData,
                mensagem: 'Informe uma data futura',
            },
            {
                nome: 'cliente',
                valido: this.isValidCliente,
                mensagem: 'O cliente deve ter pelo menos 5 caracteres'
            }
        ];
    }

    create(atendimento) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        
        const params = {
            data: {
                data,
                dataCriacao,
            },
            cliente: {
                length: atendimento.cliente.length,
            }
        }

        const erros = this.valida(params);
        const existemErros = erros.length;

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros));
        } else {

            const atendimentoDatado = {...atendimento, dataCriacao, data};

            return repositorio.create(atendimentoDatado)
                .then(results => ({id: results.insertId, ...atendimentoDatado}));

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