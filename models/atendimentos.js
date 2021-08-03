const moment = require('moment');
const repositorio = require('../repositorio/atendimentos');

class Atendimentos {

    constructor() {
        this.isValidData = ({data, dataCriacao}) => moment(data).isAfter(dataCriacao);
        this.isValidCliente = (length) => length >= 5;
        this.valida = (params) => this.validacoes.filter(campo => {
            const { nome } = campo;
            const param = params[nome];

            const resultValidation = campo.valido(param);
            if (!resultValidation) {
                return campo.valido(param);
            }
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

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:ss');
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
        return repositorio.read();
    }

    searchForID(id) {
        return repositorio.searchForID(id);
    }

    update(id, valores) {
        
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        return repositorio.update(id, valores)
            .then(results => ({id, ...valores}))
    }

    delete(id) {
        return repositorio.delete(id)
            .then(result => ({deletedId: id}));
    }

}

module.exports = new Atendimentos;