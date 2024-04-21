import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import Blog from './pages/Blog'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" Component={About}></Route>
          <Route path="/projects" Component={Projects}></Route>
          <Route path="/resume" Component={Resume}></Route>
          <Route path="/blog" Component={Blog}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
