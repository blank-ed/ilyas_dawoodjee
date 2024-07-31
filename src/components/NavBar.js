import React from 'react'
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar({ selected }) {
  return (
    <div className='NavBar'>
      <div className="NavBar_Sub">
        <div className='NavBar_left'>
          <Link to="/">{'<'} Ilyas Dawoodjee {'>'}</Link>
        </div>
        <div className='NavBar_right'>
          <Link to="/about" className={selected === "about" ? "selected" : ""}>About</Link>
          <Link to="/projects" className={selected === "projects" ? "selected" : ""}>Projects</Link>
          {/* <Link to="/resume" className={selected === "resume" ? "selected" : ""}>Resume</Link> */}
          {/* <Link to="/tags" className={selected === "tags" ? "selected" : ""}>Tags</Link> */}
        </div>
      </div>
    </div>
  )
}

export default NavBar