const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");

router.get("/", usuarioController.listarTodas);

router.post("/login", usuarioController.entrar);

router.get("/:id", usuarioController.buscarPorId);
router.delete("/del/:id", usuarioController.deletar);
router.post("/insert", usuarioController.criar);
router.put("/insert/:id", usuarioController.atualizar);

module.exports = router;