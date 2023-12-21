import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
