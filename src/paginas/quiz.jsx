import React, { useEffect, useState } from "react";
import { requisitar } from "../api";
import "./Quiz.css";

function Quiz({ usuario, setTela}) {
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState([]);

  const [perguntaAtual, setPerguntaAtual] = useState(() => {
    const salva = localStorage.getItem("rizza_pergunta_atual");
    return salva ? Number(salva) : 0;
  });

  const [respostasSelecionadas, setRespostasSelecionadas] = useState(() => {
    const salva = localStorage.getItem("rizza_respostas_selecionadas");

    try {
      return salva ? JSON.parse(salva) : {};
    } catch {
      return {};
    }
  });

  const [respostasTexto, setRespostasTexto] = useState(() => {
    const salva = localStorage.getItem("rizza_respostas_texto");

    try {
      return salva ? JSON.parse(salva) : {};
    } catch {
      return {};
    }
  });

  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    carregarQuiz();
  }, []);

  async function carregarQuiz() {
    try {
      setCarregando(true);

      const dadosPerguntas = await requisitar("/pergunta");
      const dadosRespostas = await requisitar("/respostas");

      const listaPerguntas = Array.isArray(dadosPerguntas)
        ? dadosPerguntas
        : [];

      const listaRespostas = Array.isArray(dadosRespostas)
        ? dadosRespostas
        : [];

      setPerguntas(listaPerguntas);
      setRespostas(listaRespostas);

      const perguntaSalva = Number(
        localStorage.getItem("rizza_pergunta_atual") || 0
      );

      if (
        perguntaSalva >= 0 &&
        perguntaSalva < listaPerguntas.length
      ) {
        setPerguntaAtual(perguntaSalva);
      } else {
        setPerguntaAtual(0);
        localStorage.setItem("rizza_pergunta_atual", "0");
      }
    } catch (erro) {
      console.error("Erro ao carregar quiz:", erro);

      setMensagem(
        "Não foi possível carregar as perguntas do quiz."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    localStorage.setItem(
      "rizza_pergunta_atual",
      String(perguntaAtual)
    );
  }, [perguntaAtual]);

  useEffect(() => {
    localStorage.setItem(
      "rizza_respostas_selecionadas",
      JSON.stringify(respostasSelecionadas)
    );
  }, [respostasSelecionadas]);

  useEffect(() => {
    localStorage.setItem(
      "rizza_respostas_texto",
      JSON.stringify(respostasTexto)
    );
  }, [respostasTexto]);

  function selecionarResposta(idPergunta, idResposta) {
    setRespostasSelecionadas((respostasAtuais) => ({
      ...respostasAtuais,
      [idPergunta]: idResposta,
    }));

    setMensagem("");
  }

  function selecionarRespostaTexto(idPergunta, texto) {
    setRespostasTexto((respostasAtuais) => ({
      ...respostasAtuais,
      [idPergunta]: texto,
    }));

    setMensagem("");
  }

  function perguntaEhAberta(pergunta) {
    return Number(pergunta.id_pergunta) === 7;
  }

  function respostasDaPergunta(idPergunta) {
    return respostas.filter(
      (resposta) =>
        Number(resposta.id_pergunta) === Number(idPergunta)
    );
  }

  function proximaPergunta() {
    const pergunta = perguntas[perguntaAtual];

    if (!pergunta) {
      return;
    }

    if (perguntaEhAberta(pergunta)) {
      const respostaTexto =
        respostasTexto[pergunta.id_pergunta]?.trim();

      if (!respostaTexto) {
        setMensagem(
          "Digite uma resposta antes de continuar."
        );
        return;
      }
    } else {
      const respostaSelecionada =
        respostasSelecionadas[pergunta.id_pergunta];

      if (!respostaSelecionada) {
        setMensagem(
          "Selecione uma resposta antes de continuar."
        );
        return;
      }
    }

    setMensagem("");

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual((atual) => atual + 1);
    } else {
      finalizarQuiz();
    }
  }

  function perguntaAnterior() {
    setMensagem("");

    if (perguntaAtual > 0) {
      setPerguntaAtual((atual) => atual - 1);
    }
  }

  async function finalizarQuiz() {
    try {
      setEnviando(true);
      setMensagem("");

      if (!usuario?.id_usuario) {
        setMensagem(
          "Usuário não identificado. Faça login novamente."
        );

        setEnviando(false);
        return;
      }

      const quizCriado = await requisitar(
        "/quiz/insert",
        {
          method: "POST",
          body: JSON.stringify({
            id_usuario: usuario.id_usuario,
          }),
        }
      );

      const idQuiz =
        quizCriado?.id_quiz ||
        quizCriado?.insertId ||
        quizCriado?.id;

      if (!idQuiz) {
        throw new Error(
          "A API não retornou o ID do quiz."
        );
      }

      for (const pergunta of perguntas) {
        const idResposta =
          respostasSelecionadas[pergunta.id_pergunta];

        if (!idResposta) {
          continue;
        }

        await requisitar(
          "/respostas/insert",
          {
            method: "POST",
            body: JSON.stringify({
              id_quiz: idQuiz,
              id_resposta: idResposta,
            }),
          }
        );
      }

      const respostaQuestao7 =
        respostasTexto[7]?.trim();

      if (respostaQuestao7) {
        console.log(
          "Resposta da questão 7:",
          respostaQuestao7
        );
      }

      localStorage.removeItem("rizza_pergunta_atual");
      localStorage.removeItem(
        "rizza_respostas_selecionadas"
      );
      localStorage.removeItem(
        "rizza_respostas_texto"
      );

      setFinalizado(true);

    } catch (erro) {
      console.error(
        "Erro ao finalizar quiz:",
        erro
      );

      setMensagem(
        erro.message ||
        "Não foi possível salvar o quiz."
      );
    } finally {
      setEnviando(false);
    }
  }

  function reiniciarQuiz() {
    localStorage.removeItem("rizza_pergunta_atual");
    localStorage.removeItem(
      "rizza_respostas_selecionadas"
    );
    localStorage.removeItem(
      "rizza_respostas_texto"
    );

    setPerguntaAtual(0);
    setRespostasSelecionadas({});
    setRespostasTexto({});
    setMensagem("");
    setFinalizado(false);
  }

  if (carregando) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h1>Quiz Rizza</h1>
          <p>Carregando perguntas...</p>
        </div>
      </div>
    );
  }

  if (mensagem && perguntas.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h1>Quiz Rizza</h1>

          <p className="mensagem-erro">
            {mensagem}
          </p>

          <button
            className="botao-principal"
            onClick={carregarQuiz}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (finalizado) {
    return (
      <div className="quiz-container">
        <div className="quiz-card quiz-finalizado">
          <div className="icone-sucesso">
            ✓
          </div>

          <h1>Quiz finalizado!</h1>

          <p>
            Suas respostas foram registradas
            com sucesso.
          </p>

          <p>
            O profissional poderá consultar
            seu resultado no sistema.
          </p>

       <button
  className="botao-voltar-inicio"
  onClick={() => setTela("inicio")}
>
  Voltar ao início
</button>
        </div>
      </div>
    );
  }

  if (perguntas.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h1>Quiz Rizza</h1>

          <p>
            Nenhuma pergunta foi cadastrada ainda.
          </p>
        </div>
      </div>
    );
  }

  const pergunta = perguntas[perguntaAtual];

  if (!pergunta) {
    setPerguntaAtual(0);
    return null;
  }

  const opcoes = respostasDaPergunta(
    pergunta.id_pergunta
  );

  const respostaSelecionada =
    respostasSelecionadas[
      pergunta.id_pergunta
    ];

  const respostaTextoAtual =
    respostasTexto[
      pergunta.id_pergunta
    ] || "";

  const perguntaAberta =
    perguntaEhAberta(pergunta);

  const progresso =
    ((perguntaAtual + 1) /
      perguntas.length) *
    100;

  return (
    <div className="quiz-container">
      <div className="quiz-card">

        <div className="quiz-topo">
          <div>
            <span className="quiz-label">
              QUIZ RIZZA
            </span>

            <h1>
              Descubra o perfil do seu cabelo
            </h1>

            <p>
              Responda algumas perguntas para
              ajudar na personalização.
            </p>
          </div>
        </div>

        <div className="quiz-progresso">
          <div className="progresso-info">
            <span>
              Pergunta {perguntaAtual + 1} de{" "}
              {perguntas.length}
            </span>

            <span>
              {Math.round(progresso)}%
            </span>
          </div>

          <div className="barra-progresso">
            <div
              className="barra-progresso-preenchida"
              style={{
                width: `${progresso}%`,
              }}
            />
          </div>
        </div>

        <div className="pergunta">
          <h2>
            {pergunta.enunciado}
          </h2>

          {perguntaAberta ? (
            <div className="resposta-aberta">
              <textarea
                value={respostaTextoAtual}
                onChange={(e) =>
                  selecionarRespostaTexto(
                    pergunta.id_pergunta,
                    e.target.value
                  )
                }
                placeholder="Digite sua resposta..."
                rows={5}
              />
            </div>
          ) : (
            <div className="opcoes">
              {opcoes.length === 0 ? (
                <p className="mensagem-erro">
                  Nenhuma resposta cadastrada
                  para esta pergunta.
                </p>
              ) : (
                opcoes.map((resposta) => {
                  const selecionada =
                    Number(respostaSelecionada) ===
                    Number(resposta.id_resposta);

                  return (
                    <button
                      key={resposta.id_resposta}
                      type="button"
                      className={
                        selecionada
                          ? "opcao selecionada"
                          : "opcao"
                      }
                      onClick={() =>
                        selecionarResposta(
                          pergunta.id_pergunta,
                          resposta.id_resposta
                        )
                      }
                    >
                      <span className="radio-opcao">
                        {selecionada ? "✓" : ""}
                      </span>

                      <span>
                        {resposta.texto ||
                          resposta.descricao ||
                          resposta.enunciado ||
                          resposta.resposta}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {mensagem && (
          <div className="mensagem-quiz">
            {mensagem}
          </div>
        )}

        <div className="botoes-quiz">
          <button
            type="button"
            className="botao-voltar"
            onClick={perguntaAnterior}
            disabled={perguntaAtual === 0}
          >
            ← Voltar
          </button>

          <button
            type="button"
            className="botao-principal"
            onClick={proximaPergunta}
            disabled={enviando}
          >
            {enviando
              ? "Salvando..."
              : perguntaAtual ===
                perguntas.length - 1
              ? "Finalizar quiz"
              : "Próxima →"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Quiz;