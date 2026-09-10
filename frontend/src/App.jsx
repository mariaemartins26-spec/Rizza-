import { useState } from 'react';
import Menu from './componentes/Menu';
import Login from './paginas/login';
import Inicio from './paginas/Inicio';
import Quiz from './paginas/Quiz';
import Gerenciamento from './paginas/Gerenciamento.jsx';
import Tricologistas from './paginas/Tricologistas.jsx';
import './estilos.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [tela, setTela] = useState('inicio');

  function entrar(usuarioLogado) {
    setUsuario(usuarioLogado);
    setTela('inicio');
  }

  function sair() {
    setUsuario(null);
    setTela('inicio');
  }

  if (!usuario) {
    return <Login aoEntrar={entrar} />;
  }

  return (
    <>
      <Menu
        usuario={usuario}
        mudarTela={setTela}
        sair={sair}
      />

      <main className="conteudo">

        {tela === 'inicio' && (
          <Inicio usuario={usuario} />
        )}

        {tela === 'quiz' && (
          <Quiz />
        )}

        {tela === 'gerenciamento' && (
          <Gerenciamento />
        )}

        {tela === 'tricologistas' && (
          <Tricologistas />
        )}

      </main>
    </>
  );
}

export default App;