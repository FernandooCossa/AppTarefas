//import './App.css';
//import MenuSuperior from './components/MenuSuperior';
import cadastrar_tarefas from './components/cadastrar_tarefa';
import cadastrar_usuario from './components/cadastrar_usuario';
import manutencao_tarefas from './components/manutencao_tarefas';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ManutencaoLivros from './components/ManutencaoLivros';
//import ResumoLivros from './components/ResumoLivros';
const App = () => {
  return(  //tudo que vai aqui no return é o que aparece na aplicação
    <>
    <Router>  
      <Routes>
        <Route exact path="/tarefa" Component={cadastrar_tarefas}/>
        <Route exact path="/usuario" Component={cadastrar_usuario}/>
        <Route exact path="/manutencao" Component={manutencao_tarefas}/>
      </Routes>
      </Router>
    </>
  )
}
//Serão criados 2 componentes para essa aplicação
//MenuSuperior.js
//InclusaoLivros.js
export default App;