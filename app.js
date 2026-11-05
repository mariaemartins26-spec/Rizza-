const express = require("express");
const cors = require("cors");


const app = express();

const perfilCapilarRoutes = require("./routes/perfilCapilarRoutes");
const quizRoutes = require("./routes/quizRoutes");
const recomendacaoRoutes = require("./routes/recomendacaoRoutes");
const respostasRoutes = require("./routes/respostasRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const perguntaRoutes = require("./routes/perguntaRoutes");
const tricologistasRoutes = require('./routes/tricologistasRoutes');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/perfil-capilar", perfilCapilarRoutes);
app.use("/quiz", quizRoutes);
app.use("/recomendacao", recomendacaoRoutes);
app.use("/respostas", respostasRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/pergunta", perguntaRoutes);
app.use('/tricologistas', tricologistasRoutes);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor ativo e rodando na porta ${PORT}`);
});

module.exports = app;