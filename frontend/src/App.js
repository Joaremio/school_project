import Home from "./components/pages/Home";
import Alunos from "./components/pages/Alunos";
import NewAluno from "./components/pages/NewAluno";
import { Routes, Route } from "react-router-dom";
import Ficha from "./components/pages/Ficha";
import TurmaPage from "./components/pages/TurmaPage/TurmaPage";
import TurmaDetalhes from "./components/pages/TurmaDetalhes/TurmaDetalhes";
import { PrivateRoute } from "./components/PrivateRouter";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/alunos"
          element={
            <PrivateRoute>
              <Alunos />
            </PrivateRoute>
          }
        />
        <Route
          path="/newaluno"
          element={
            <PrivateRoute>
              <NewAluno />
            </PrivateRoute>
          }
        />
        <Route
          path="/ficha/:id"
          element={
            <PrivateRoute>
              <Ficha />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas"
          element={
            <PrivateRoute>
              <TurmaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turma/detalhes/:id"
          element={
            <PrivateRoute>
              <TurmaDetalhes />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
