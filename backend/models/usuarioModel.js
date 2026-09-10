const bd = require("../connection/connection");

const usuario = {
    getAll: (callback) => {
        const select = "SELECT * FROM usuario";
        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = "SELECT * FROM usuario WHERE id_usuario = ?";
        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const del = "DELETE FROM usuario WHERE id_usuario = ?";
        bd.query(del, [id], callback);
    },

    create: (data, callback) => {
        const insert = "INSERT INTO usuario SET nome=?, email=?, senha=?";
        bd.query(
            insert,
            [data.nome, data.email, data.senha],
            callback
        );
    },

    update: (id, data, callback) => {
        const update =
            "UPDATE usuario SET nome=?, email=?, senha=? WHERE id_usuario=?";

        bd.query(
            update,
            [data.nome, data.email, data.senha, id],
            callback
        );
    },

    buscarUsuarioPorEmailESenha: (email, senha, callback) => {
        const select =
            "SELECT id_usuario, email, senha FROM usuario WHERE email = ? AND senha = ?";

        bd.query(
            select,
            [email, senha],
            callback
        );
    }
};

module.exports = usuario;