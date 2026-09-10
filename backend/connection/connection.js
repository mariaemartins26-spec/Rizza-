const mysql = require("mysql2");

const bd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "rizza",
});

bd.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conexão estabelecida com sucesso.");
});

module.exports = bd;
