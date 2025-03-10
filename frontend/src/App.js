import Home from './components/pages/Home'
import Alunos from './components/pages/Alunos'
import Turmas from './components/pages/Turmas'
import NewAluno from './components/pages/NewAluno'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/layout/Index';
import Ficha from './components/pages/Ficha'
import TurmaPage from './components/pages/TurmaPage'


function App() {
  return (
    <Router>
      <div className="App">
        <Index />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/alunos' element={<Alunos />} />
            <Route path='/turmas' element={<Turmas />} />
            <Route path='/newaluno' element={<NewAluno />} />
            <Route path={`/ficha/:id`} element={<Ficha />} />
            <Route path={`/turma/:id`} element={<TurmaPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
