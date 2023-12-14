// Importando os componentes de cadastrar tarefas, cadastrar usuário e manutenção de tarefas
import Menu_Superior from './components/MenuSuperior';
import CadastrarTarefas from './components/cadastrar_tarefa';
import CadastrarUsuario from './components/cadastrar_usuario';
import ManutencaoTarefas from './components/manutencao_tarefas';
import FormularioLogin from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';
//import './css/index.css';

// Importando as bibliotecas necessárias para roteamento
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importando estilos do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  return autenticado ? children : <Navigate to="/login" />;
};

const RoutesWithAuth = () => {
  const { autenticado } = useAuth();

  return (
      <Router>
          {autenticado && <Menu_Superior />}
          <Routes>
              <Route path="/login" element={<FormularioLogin />} />
              <Route path="/" element={autenticado ? <Navigate to="/tarefa" /> : <FormularioLogin />} />
              <Route path="/tarefa" element={<ProtectedRoute><CadastrarTarefas /></ProtectedRoute>} />
              <Route path="/manutencao" element={<ProtectedRoute><ManutencaoTarefas /></ProtectedRoute>} />
              <Route path="/user" element={<ProtectedRoute><CadastrarUsuario /></ProtectedRoute>} />
          </Routes>
      </Router>
  );
};

const App = () => {
  return (
      <AuthProvider>
          <RoutesWithAuth/>
      </AuthProvider>
  );
};
export default App;
