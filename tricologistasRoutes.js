const express = require("express");
const router = express.Router();

const tricologistaController = require("../controllers/tricologistasControllers");

router.get("/", tricologistaController.listar);
router.get("/:id", tricologistaController.buscarPorId);
router.post("/", tricologistaController.criar);
router.put("/:id", tricologistaController.atualizar);
router.delete("/:id", tricologistaController.excluir);

module.exports = router;