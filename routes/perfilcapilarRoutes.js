const express = require("express");
const router = express.Router();

const perfilCapilarController = require('../controllers/perfilCapilarControllers');

router.get("/", perfilCapilarController.listarTodos);

router.get("/:id", perfilCapilarController.buscarPorId);

router.delete("/del/:id", perfilCapilarController.deletar);

router.post("/insert", perfilCapilarController.criar);

router.put("/insert/:id", perfilCapilarController.atualizar);

module.exports = router;
