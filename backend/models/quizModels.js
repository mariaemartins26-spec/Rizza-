const bd = require("../connection/connection");

const quiz = {
    getAll: (callback) => {
        const select = "SELECT * FROM quiz";
        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = "SELECT * FROM quiz WHERE id_quiz = ?";
        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const del = "DELETE FROM quiz WHERE id_quiz = ?";
        bd.query(del, [id], callback);
    },

    create: (data, callback) => {
        const insert = "INSERT INTO quiz (id_usuario) VALUES (?)";
        bd.query(insert, [data.id_usuario], callback);
    },

    update: (id, data, callback) => {
        const update = "UPDATE quiz SET id_usuario = ? WHERE id_quiz = ?";
        bd.query(update, [data.id_usuario, id], callback);
    }
};

module.exports = quiz;