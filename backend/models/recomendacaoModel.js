const bd = require("../connection/connection");

const recomendacao = {
    getAll: (callback) => {
        const select = "SELECT * FROM recomendacao";
        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = "SELECT * FROM recomendacao WHERE id_recomendacao = ?";
        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const del = "DELETE FROM recomendacao WHERE id_recomendacao = ?";
        bd.query(del, [id], callback);
    },

    create: (data, callback) => {
        const insert = "INSERT INTO recomendacao (id_perfil) VALUES (?)";
        bd.query(insert, [data.id_perfil], callback);
    },

    update: (id, data, callback) => {
        const update = "UPDATE recomendacao SET id_perfil = ? WHERE id_recomendacao = ?";
        bd.query(update, [data.id_perfil, id], callback);
    }
};

module.exports = recomendacao;