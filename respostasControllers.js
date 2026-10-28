const resposta = require("../models/respostasModel");

exports.listarTodas = (req, res) => {
    resposta.getAll((err, results) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.json(results);
    });
};

exports.buscarPorId = (req, res) => {
    resposta.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.json(results);
    });
};

exports.deletar = (req, res) => {
    resposta.delete(req.params.id, (err) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.send("Registro apagado com sucesso!");
    });
};

exports.criar = (req, res) => {
    resposta.create(req.body, (err) => {
        if (err) return res.status(500).send("err");
        res.status(201).send("Registro cadastrado com sucesso!");
    });
};

exports.atualizar = (req, res) => {
    resposta.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.send("Registro atualizado com sucesso!");
    });
};