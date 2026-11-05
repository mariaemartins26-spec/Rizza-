
const usuario = require("../models/usuarioModel");

exports.listarTodas = (req, res) => {
    usuario.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao listar usuários."
            });
        }

        res.json(results);
    });
};

exports.buscarPorId = (req, res) => {
    usuario.getById(req.params.id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao buscar usuário."
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        res.json(results[0]);
    });
};

exports.deletar = (req, res) => {
    usuario.delete(req.params.id, (err, resultado) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao excluir usuário."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        res.json({
            mensagem: "Usuário excluído com sucesso!"
        });
    });
};

exports.criar = (req, res) => {
    const { nome, email, senha, tipo_usuario, id_clinica } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Nome, e-mail e senha são obrigatórios."
        });
    }

    const tipo = tipo_usuario || "cliente";

    if (!["cliente", "profissional", "admin"].includes(tipo)) {
        return res.status(400).json({
            mensagem: "Tipo de usuário inválido."
        });
    }

    if (tipo === "profissional" && !id_clinica) {
        return res.status(400).json({
            mensagem: "Informe a clínica do profissional."
        });
    }

    usuario.create(
        {
            nome,
            email,
            senha,
            tipo_usuario: tipo,
            id_clinica: id_clinica || null
        },
        (err, resultado) => {
            if (err) {
                console.error(err);

                if (err.code === "ER_NO_REFERENCED_ROW_2") {
                    return res.status(400).json({
                        mensagem: "A clínica informada não existe."
                    });
                }

                return res.status(500).json({
                    mensagem: "Erro ao cadastrar usuário."
                });
            }

            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!",
                id_usuario: resultado.insertId
            });
        }
    );
};

exports.atualizar = (req, res) => {
    const { nome, email, senha, tipo_usuario, id_clinica } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Nome, e-mail e senha são obrigatórios."
        });
    }

    const tipo = tipo_usuario || "cliente";

    if (!["cliente", "profissional", "admin"].includes(tipo)) {
        return res.status(400).json({
            mensagem: "Tipo de usuário inválido."
        });
    }

    if (tipo === "profissional" && !id_clinica) {
        return res.status(400).json({
            mensagem: "Informe a clínica do profissional."
        });
    }

    usuario.update(
        req.params.id,
        {
            nome,
            email,
            senha,
            tipo_usuario: tipo,
            id_clinica: id_clinica || null
        },
        (err, resultado) => {
            if (err) {
                console.error(err);

                if (err.code === "ER_NO_REFERENCED_ROW_2") {
                    return res.status(400).json({
                        mensagem: "A clínica informada não existe."
                    });
                }

                return res.status(500).json({
                    mensagem: "Erro ao atualizar usuário."
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });
            }

            res.json({
                mensagem: "Usuário atualizado com sucesso!"
            });
        }
    );
};

exports.entrar = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Informe o e-mail e a senha."
        });
    }

    usuario.buscarUsuarioPorEmailESenha(
        email,
        senha,
        (err, results) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    mensagem: "Erro ao entrar no sistema."
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    mensagem: "E-mail ou senha incorretos."
                });
            }

            const dadosUsuario = { ...results[0] };
            delete dadosUsuario.senha;

            res.json(dadosUsuario);
        }
    );
};
