const pergunta = require("../models/perguntaModel");

exports.listarTodas = (req, res) => {
    pergunta.getAll((err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.json(results);
    });
};

exports.buscarPorId = (req, res) => {
    pergunta.getById(req.params.id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.json(results);
    });
};

exports.deletar = (req, res) => {
    pergunta.delete(req.params.id, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.send("Registro apagado com sucesso!");
    });
};

exports.criar = (req, res) => {
    pergunta.create(req.body, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.status(201).send("Registro cadastrado com sucesso!");
    });
};

exports.atualizar = (req, res) => {
    pergunta.update(req.params.id, req.body, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.send("Registro atualizado com sucesso!");
    });
};