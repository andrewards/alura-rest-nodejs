const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '..', 'assets', 'lulu.jpg'), (err, buffer) => {
    console.log('imagem foi bufferizada!');

    fs.writeFile('./assets/lulu2.jpg', buffer, err => {
        console.log('imagem foi escrita!');
    });
});