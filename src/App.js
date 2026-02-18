import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <div className="App">
      <Router basename="/ilyas_dawoodjee">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogpage/:blogId" element={<BlogPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
