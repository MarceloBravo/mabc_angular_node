const mysql = require('mysql');

let connection = {}

connection.conect = () => {
    return mysql.createConnection({
        hhost: '127.0.0.1:3306',
        user: 'root',
        password: 'mabc',
        database: 'mabc'
    });
} 

module.exports = connection;