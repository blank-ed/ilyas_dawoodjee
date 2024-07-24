import React from 'react'
import './Projects.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Projects() {
  return (
    <div className='Projects Page'>
      <NavBar selected='projects'></NavBar>
      <div className="Projects_Container">
        Projects
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Projects