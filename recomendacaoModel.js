
const bd = require("../connection/connection");

const recomendacao = {
    getAll: (callback) => {
      const select = `
    SELECT
        r.id_recomendacao,
        r.id_perfil,
        p.id_quiz,
        q.id_usuario
    FROM recomendacao r
    INNER JOIN perfil_capilar p
        ON r.id_perfil = p.id_perfil
    INNER JOIN quiz q
        ON p.id_quiz = q.id_quiz
    ORDER BY r.id_recomendacao DESC
`;

        bd.query(select, callback);
    },

    getById: (id, callback) => {
        const select = `
            SELECT
                r.id_recomendacao,
                r.id_perfil,
                p.id_quiz
            FROM recomendacao r
            INNER JOIN perfil_capilar p
                ON r.id_perfil = p.id_perfil
            WHERE r.id_recomendacao = ?
        `;

        bd.query(select, [id], callback);
    },

    delete: (id, callback) => {
        const sql =
            "DELETE FROM recomendacao WHERE id_recomendacao = ?";

        bd.query(sql, [id], callback);
    },

    create: (data, callback) => {
        const sql =
            "INSERT INTO recomendacao (id_perfil) VALUES (?)";

        bd.query(sql, [data.id_perfil], callback);
    },

    update: (id, data, callback) => {
        const sql = `
            UPDATE recomendacao
            SET id_perfil = ?
            WHERE id_recomendacao = ?
        `;

        bd.query(sql, [data.id_perfil, id], callback);
    }
};

module.exports = recomendacao;
