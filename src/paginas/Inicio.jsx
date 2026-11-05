
import { useEffect, useState } from "react";
import "./inicio.css";
import { requisitar } from "../api";

function Inicio({ usuario, setTela }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarAvaliacoes();
  }, [usuario]);

  async function carregarAvaliacoes() {
    setCarregando(true);

    try {
      const resposta = await requisitar("/quiz");

      const lista = Array.isArray(resposta) ? resposta : [];

      const meusQuizzes = lista.filter(
        (quiz) =>
          Number(quiz.id_usuario) === Number(usuario?.id_usuario)
      );

      setAvaliacoes(meusQuizzes);
    } catch (erro) {
      console.error("Erro ao carregar avaliações:", erro);
      setAvaliacoes([]);
    } finally {
      setCarregando(false);
    }
  }

  const avaliacoesOrdenadas = [...avaliacoes].sort((a, b) => {
    const dataA = new Date(
      a.data_criacao || a.data || a.created_at || 0
    ).getTime();

    const dataB = new Date(
      b.data_criacao || b.data || b.created_at || 0
    ).getTime();

    return dataB - dataA;
  });

  const ultimaAvaliacao = avaliacoesOrdenadas[0] || null;

  function formatarData(data) {
    if (!data) return "Data não disponível";

    const dataObj = new Date(data);

    if (isNaN(dataObj.getTime())) return data;

    return dataObj.toLocaleDateString("pt-BR");
  }

  function abrirRecomendacoes() {
    if (ultimaAvaliacao) {
      setTela("recomendacoes");
    } else {
      setTela("quiz");
    }
  }

  return (
    <section className="inicio">
      {/* BOAS-VINDAS */}
      <div className="inicio-boas-vindas">
        <span className="inicio-label">BEM-VINDO À RIZZA</span>

        <h1>
          Bem-vindo, {usuario?.nome || "usuário"}!
        </h1>

        <p>
          Acompanhe suas avaliações capilares, resultados
          e recomendações em um só lugar.
        </p>
      </div>

      {/* AÇÕES PRINCIPAIS */}
      <div className="inicio-acoes">
        <button
          className="acao-principal"
          onClick={() => setTela("quiz")}
        >
          <span>+</span>
          <div>
            <strong>Iniciar novo quiz</strong>
            <small>Comece uma nova avaliação capilar</small>
          </div>
        </button>

        <button
          className="acao-secundaria"
          onClick={() => setTela("quiz")}
        >
          <span>↗</span>
          <div>
            <strong>Ver resultados</strong>
            <small>
              {ultimaAvaliacao
                ? "Consulte suas avaliações realizadas"
                : "Você ainda não possui resultados"}
            </small>
          </div>
        </button>
      </div>

      {/* ÚLTIMA AVALIAÇÃO */}
      <section className="inicio-secao">
        <div className="secao-titulo">
          <div>
            <span className="inicio-label">AVALIAÇÃO</span>
            <h2>Última avaliação</h2>
          </div>

          {ultimaAvaliacao && (
            <span className="status-disponivel">
              Resultado disponível
            </span>
          )}
        </div>

        {carregando ? (
          <div className="ultima-avaliacao">
            <div>
              <span>Avaliação</span>
              <strong>Carregando...</strong>
            </div>
          </div>
        ) : ultimaAvaliacao ? (
          <div className="ultima-avaliacao">
            <div>
              <span>Data da avaliação</span>
              <strong>
                {formatarData(
                  ultimaAvaliacao.data_criacao ||
                  ultimaAvaliacao.data ||
                  ultimaAvaliacao.created_at
                )}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="status-texto">Concluída</strong>
            </div>

            <button
              className="botao-resultado"
              onClick={() => setTela("quiz")}
            >
              Ver resultado
            </button>
          </div>
        ) : (
          <div className="ultima-avaliacao">
            <div>
              <span>Avaliação</span>
              <strong>
                Você ainda não realizou nenhuma avaliação.
              </strong>
            </div>

            <div>
              <span>Comece agora</span>
              <strong className="status-texto">Primeiro quiz</strong>
            </div>

            <button
              className="botao-resultado"
              onClick={() => setTela("quiz")}
            >
              Iniciar avaliação
            </button>
          </div>
        )}
      </section>

      {/* HISTÓRICO */}
      <section className="inicio-secao">
        <div className="secao-titulo">
          <div>
            <span className="inicio-label">AVALIAÇÕES</span>
            <h2>Histórico</h2>
          </div>
        </div>

        {carregando ? (
          <div className="historico">
            <p>Carregando histórico...</p>
          </div>
        ) : avaliacoesOrdenadas.length > 0 ? (
          <div className="historico">
            {avaliacoesOrdenadas.slice(0, 3).map((quiz, index) => (
              <div
                className="historico-item"
                key={quiz.id_quiz || index}
              >
                <div>
                  <strong>
                    {formatarData(
                      quiz.data_criacao ||
                      quiz.data ||
                      quiz.created_at
                    )}
                  </strong>
                  <span>Avaliação capilar</span>
                </div>

                <span className="status-disponivel">
                  Disponível
                </span>

                <button
                  className="botao-ver"
                  onClick={() => setTela("quiz")}
                >
                  Ver
                </button>
              </div>
            ))}

            {avaliacoesOrdenadas.length > 3 && (
              <button
                className="historico-completo"
                onClick={() => setTela("historico")}
              >
                Ver histórico completo →
              </button>
            )}
          </div>
        ) : (
          <div className="historico">
            <div className="historico-vazio">
              <strong>Nenhuma avaliação realizada</strong>
              <span>
                Seu histórico aparecerá aqui depois que você
                realizar seu primeiro quiz.
              </span>
              <button
                className="historico-completo"
                onClick={() => setTela("quiz")}
              >
                Fazer primeiro quiz →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* RECOMENDAÇÕES */}
      <section className="inicio-secao recomendacoes">
        <span className="inicio-label">RECOMENDAÇÕES</span>

        <h2>Recomendações recentes</h2>

        <p>
          {carregando
            ? "Verificando suas avaliações..."
            : ultimaAvaliacao
              ? "Consulte as recomendações relacionadas às suas avaliações capilares."
              : "Realize sua primeira avaliação para começar a consultar recomendações personalizadas."}
        </p>

        <button
          className="botao-recomendacoes"
          onClick={abrirRecomendacoes}
          disabled={carregando}
        >
          {carregando
            ? "Carregando..."
            : ultimaAvaliacao
              ? "Ver recomendações →"
              : "Fazer avaliação →"}
        </button>
      </section>

      {/* DICA DA RIZZA */}
      <section className="dica-rizza">
        <div className="dica-icone">i</div>

        <div>
          <span className="inicio-label">DICA DA RIZZA</span>
          <p>
            Responda o quiz novamente sempre que perceber mudanças
            nas necessidades do cabelo.
          </p>
        </div>
      </section>

      {/* ATALHOS */}
      <section className="atalhos">
        <span className="inicio-label">ACESSO RÁPIDO</span>
        <h2>Atalhos principais</h2>

        <div className="atalhos-lista">
          <button onClick={() => setTela("quiz")}>
            Quiz
          </button>

          <button onClick={() => setTela("quiz")}>
            Resultados
          </button>

          <button onClick={() => setTela("historico")}>
            Histórico
          </button>

          <button onClick={abrirRecomendacoes}>
            Recomendações
          </button>
        </div>
      </section>
    </section>
  );
}

export default Inicio;
