const express = require("express");
const router = express.Router();
const respostaController = require("../controllers/respostasControllers");

router.get("/", respostaController.listarTodas);
router.get("/:id", respostaController.buscarPorId);
router.delete("/del/:id", respostaController.deletar);
router.post("/insert", respostaController.criar);
router.put("/insert/:id", respostaController.atualizar);

module.exports = router;

// Rota: respostasRoutes.js