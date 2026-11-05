const bd = require("../connection/connection");

const pergunta = {
    getAll: (callback) => {
        const select = "SELECT * FROM pergunta";
        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = "SELECT * FROM pergunta WHERE id_pergunta = ?";
        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const del = "DELETE FROM pergunta WHERE id_pergunta = ?";
        bd.query(del, [id], callback);
    },

    create: (data, callback) => {
        const insert = "INSERT INTO pergunta (enunciado) VALUES (?)";
        bd.query(insert, [data.enunciado], callback);
    },

    update: (id, data, callback) => {
        const update = "UPDATE pergunta SET enunciado = ? WHERE id_pergunta = ?";
        bd.query(update, [data.enunciado, id], callback);
    }
};

module.exports = pergunta;