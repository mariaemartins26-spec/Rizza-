const quiz = require("../models/quizModels");

exports.listarTodas = (req, res) => {
    quiz.getAll((err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.send(results);
    });
};

exports.buscarPorId = (req, res) => {
    quiz.getById(req.params.id_quiz, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.send(results);
    });
};

exports.deletar = (req, res) => {
    quiz.delete(req.params.id_quiz, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.send("Registro apagado com sucesso!");
    });
};

exports.criar = (req, res) => {
    quiz.create(req.body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.status(201).json({
            mensagem: "Registro cadastrado com sucesso!",
            id_quiz: results.insertId
        });
    });
};

exports.atualizar = (req, res) => {
    quiz.update(req.params.id, req.body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro interno no servidor");
        }

        res.send("Registro atualizado com sucesso!");
    });
};