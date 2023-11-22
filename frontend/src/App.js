import './App.css';
import React from 'react';
import { Header } from './Components/Header';
import { NotesListPage } from './Pages/NotesListPage';
import {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { NotePage } from './Pages/NotePage';

function App() {
  return (
    <div className='container dark'>
      <div className='app'>
        <Router>
          <Routes>
            <Route path='/' exact Component={NotesListPage} />
            <Route path='/note/:id' exact Component={NotePage} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;