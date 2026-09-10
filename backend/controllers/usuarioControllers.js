const usuario = require("../models/usuarioModel");

exports.listarTodas = (req, res) => {
    usuario.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

exports.buscarPorId = (req, res) => {
    usuario.getById(req.params.id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

exports.deletar = (req, res) => {
    usuario.delete(req.params.id, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.send("Registro apagado com sucesso!");
    });
};

exports.criar = (req, res) => {
    usuario.create(req.body, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.status(201).send("Registro cadastrado com sucesso!");
    });
};

exports.atualizar = (req, res) => {
    usuario.update(req.params.id, req.body, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.send("Registro atualizado com sucesso!");
    });
};

exports.entrar = (req, res) => {
    const { email, senha } = req.body;

    usuario.buscarUsuarioPorEmailESenha(email, senha, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao entrar no sistema"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.json(results[0]);
    });
};