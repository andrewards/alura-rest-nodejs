const fs = require('fs');
const path = require('path');

fs.createReadStream(path.resolve(__dirname, '..', 'assets', 'lulu.jpg'))
    .pipe(fs.createWriteStream(path.resolve(__dirname, '..', 'assets', 'lulu-stream.jpg')))
    .on("finish", () => {
        console.log('Imagem foi escrita com sucesso!');
    });