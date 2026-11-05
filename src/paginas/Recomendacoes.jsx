
import { useEffect, useState } from "react";
import { requisitar } from "../api";
import "./Recomendacoes.css";

function Recomendacoes({ usuario, setTela }) {
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarRecomendacoes() {
      setCarregando(true);
      setErro("");

      try {
        const resposta = await requisitar("/recomendacao");

        const lista = Array.isArray(resposta)
          ? resposta
          : resposta?.recomendacoes || [];

        const idUsuario = Number(usuario?.id_usuario);

        const filtradas = lista.filter(
          (item) => Number(item.id_usuario) === idUsuario
        );

        setRecomendacoes(filtradas);
      } catch (error) {
        setErro("Não foi possível carregar as recomendações.");
      } finally {
        setCarregando(false);
      }
    }

    carregarRecomendacoes();
  }, [usuario]);

  return (
    <section className="pagina-recomendacoes">
      <h1>Recomendações</h1>

      <p>
        Consulte os perfis capilares e as avaliações vinculadas
        às suas recomendações.
      </p>

      {carregando && <p>Carregando recomendações...</p>}

      {erro && <p>{erro}</p>}

      {!carregando && !erro && recomendacoes.length === 0 && (
        <div className="recomendacoes-vazias">
          <h2>Nenhuma recomendação disponível</h2>
          <p>
            Quando houver recomendações vinculadas às suas avaliações,
            elas aparecerão aqui.
          </p>
          <button onClick={() => setTela("quiz")}>
            Iniciar novo quiz
          </button>
        </div>
      )}

      {!carregando &&
        !erro &&
        recomendacoes.map((item) => (
          <article key={item.id_recomendacao}>
            <h2>Recomendação #{item.id_recomendacao}</h2>

            <p>
              <strong>Perfil capilar:</strong> {item.id_perfil}
            </p>

            <p>
              <strong>Avaliação vinculada:</strong> {item.id_quiz}
            </p>
          </article>
        ))}

      <button onClick={() => setTela("inicio")}>
        Voltar ao início
      </button>
    </section>
  );
}

export default Recomendacoes;
