const express = require("express");
const router = express.Router();
const recomendacaoController = require("../controllers/recomendacaoControllers");
router.get("/", recomendacaoController.listarTodas);
router.get("/:id", recomendacaoController.buscarPorId);
router.delete("/del/:id",recomendacaoController.deletar);
router.post("/insert", recomendacaoController.criar);
router.put("/insert/:id",recomendacaoController.atualizar);
module.exports = router;

