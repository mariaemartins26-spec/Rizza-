const bd = require("../connection/connection");

const perfil_capilar = {

    getAll: (callback) => {
        const select = "SELECT * FROM perfil_capilar";
        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = "SELECT * FROM perfil_capilar WHERE id_perfil = ?";
        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const del = "DELETE FROM perfil_capilar WHERE id_perfil = ?";
        bd.query(del, [id], callback);
    },

    create: (data, callback) => {
        const insert = "INSERT INTO perfil_capilar (id_quiz) VALUES (?)";
        bd.query(insert, [data.id_quiz], callback);
    },

    update: (id, data, callback) => {
        const update = "UPDATE perfil_capilar SET id_quiz = ? WHERE id_perfil = ?";
        bd.query(update, [data.id_quiz, id], callback);
    }

};

module.exports = perfil_capilar;