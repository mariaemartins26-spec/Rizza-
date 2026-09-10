const express = require("express");
const router = express.Router();

const perguntaController = require("../controllers/perguntaControllers");

router.get("/", perguntaController.listarTodas);
router.get("/:id", perguntaController.buscarPorId);
router.delete("/del/:id", perguntaController.deletar);
router.post("/insert", perguntaController.criar);
router.put("/insert/:id", perguntaController.atualizar);

module.exports = router;