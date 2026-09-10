const bd = require("../connection/connection");
const resposta = {
    getAll: (callback) => {
        const select = "SELECT * FROM resposta";
        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = "SELECT * FROM resposta WHERE id_resposta = ?";
        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const del = "DELETE FROM resposta WHERE id_resposta = ?";
        bd.query(del, [id], callback);
    },

    create: (data, callback) => {
        const insert = "INSERT INTO resposta SET id_pergunta = ?";
        bd.query(insert, [data.id_pergunta], callback);
    },

    update: (id, data, callback) => {
        const update = "UPDATE resposta SET id_pergunta = ? WHERE id_resposta = ?";
        bd.query(update, [data.id_pergunta, id], callback);
    }
};

module.exports = resposta;