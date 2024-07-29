import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogpage/:blogId" element={<BlogPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
