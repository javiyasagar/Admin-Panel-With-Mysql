const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "project"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("mysql connected....");
})

module.exports = connection;