class Tables {

    init(connection) {
        this.connection = connection;
        console.log('As tabelas foram chamadas...');

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {

        const q = 'CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';

        this.connection.query(q, err => {
            if (err) console.log(err);
            else console.log("Tabela 'atendimentos' criada com sucesso!");
        });

    }

    criarPets() {

        const q = 'CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, nome varchar(20), imagem varchar(200), PRIMARY KEY(id))';

        this.connection.query(q, err => {
            if (err) console.log(err);
            else console.log("Tabela 'pets' criada com sucesso!");
        });

    }

}

module.exports = new Tables;