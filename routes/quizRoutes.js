const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizControllers");
router.get("/", quizController.listarTodas);
router.get("/:id", quizController.buscarPorId);
router.delete("/del/:id", quizController.deletar);
router.post("/insert", quizController.criar);
router.put("/insert/:id", quizController.atualizar);
module.exports = router;

//Rota: quizRoutes.js