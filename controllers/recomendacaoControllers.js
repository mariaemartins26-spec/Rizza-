const recomendacao = require("../models/recomendacaoModel");
exports.listarTodas = (req, res) => {
    recomendacao.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};
exports.buscarPorId = (req, res) => {
    recomendacao.getById(req.params.id_recomendacao, (err, results) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.json(results);
    });
};
exports.deletar = (req, res) => {
    recomendacao.delete(req.params.id_recomendacao, (err) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.send("Registro apagado com sucesso!");
    });
};
exports.criar = (req, res) => {
    recomendacao.create(req.body, (err) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.status(201).send("Registro cadastrado com sucesso!");
    });
};
exports.atualizar = (req, res) => {
    recomendacao.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).send("Erro interno no servidor");
        res.send("Registro atualizado com sucesso!");
    });
};