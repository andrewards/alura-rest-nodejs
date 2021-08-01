const customExpress = require('./config/customExpress');
const connection = require('./infraestrutura/connection');

connection.connect(err => {
    if (err) console.log(err);
    else {
        console.log('Conectado ao Banco de Dados!');
        const app = customExpress();

        app.listen(3000, () => console.log('Servidor rodando na porta 3000...'));
    }
});