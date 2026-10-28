
const bd = require("../connection/connection");

const usuario = {
    getAll: (callback) => {
        const select = `
            SELECT
                u.id_usuario,
                u.nome,
                u.email,
                u.tipo_usuario,
                u.id_clinica,
                c.nome AS nome_clinica
            FROM usuario u
            LEFT JOIN clinica c ON c.id_clinica = u.id_clinica
        `;

        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = `
            SELECT
                id_usuario,
                nome,
                email,
                tipo_usuario,
                id_clinica
            FROM usuario
            WHERE id_usuario = ?
        `;

        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const del = "DELETE FROM usuario WHERE id_usuario = ?";
        bd.query(del, [id], callback);
    },

    create: (data, callback) => {
        const insert = `
            INSERT INTO usuario
                (nome, email, senha, tipo_usuario, id_clinica)
            VALUES (?, ?, ?, ?, ?)
        `;

        const tipoUsuario = data.tipo_usuario || "cliente";
        const idClinica = data.id_clinica || null;

        bd.query(
            insert,
            [
                data.nome,
                data.email,
                data.senha,
                tipoUsuario,
                idClinica
            ],
            callback
        );
    },

    update: (id, data, callback) => {
        const update = `
            UPDATE usuario
            SET
                nome = ?,
                email = ?,
                senha = ?,
                tipo_usuario = ?,
                id_clinica = ?
            WHERE id_usuario = ?
        `;

        bd.query(
            update,
            [
                data.nome,
                data.email,
                data.senha,
                data.tipo_usuario || "cliente",
                data.id_clinica || null,
                id
            ],
            callback
        );
    },

    buscarUsuarioPorEmailESenha: (email, senha, callback) => {
        const select = `
            SELECT
                id_usuario,
                nome,
                email,
                senha,
                tipo_usuario,
                id_clinica
            FROM usuario
            WHERE email = ? AND senha = ?
        `;

        bd.query(select, [email, senha], callback);
    }
};

module.exports = usuario;
