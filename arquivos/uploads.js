const fs = require('fs');
const path = require('path');

module.exports = (caminho, filename, cb) => {

    const validTypes = ['jpg', 'png', 'jpeg'];
    const type = path.extname(caminho);
    const isValidType = validTypes.indexOf(type.substr(1));

    if (isValidType === -1) console.log('Erro! Tipo Inválido!');
    else {

        const dest = `./assets/img/${filename}${type}`;

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(dest))
            .on("finish", () => cb(dest));

    }

}