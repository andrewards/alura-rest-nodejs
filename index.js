const customExpress = require('./config/customExpress');
const connection = require('./infraestrutura/connection');
const tables = require('./infraestrutura/tabelas');

connection.connect(err => {
    if (err) console.log(err);
    else {
        console.log('Conectado ao Banco de Dados!');

        tables.init(connection);
        const app = customExpress();

        app.listen(3000, () => console.log('Servidor rodando na porta 3000...'));
    }
});