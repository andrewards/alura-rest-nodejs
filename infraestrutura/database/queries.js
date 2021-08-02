const connection = require('./connection');

const execute = (q, params = '') => {
    return new Promise((resolve, reject) => {
        connection.query(q, params, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}