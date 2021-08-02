const fs = require('fs');

module.exports = (path, filename, cb) => {

    const dest = `./assets/img/${filename}`;

    fs.createReadStream(path)
        .pipe(fs.createWriteStream(dest))
        .on("finish", () => cb(dest));

}