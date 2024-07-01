import React from 'react'
import './Projects.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Projects() {
  return (
    <div className='Projects'>
      <NavBar selected='projects'></NavBar>
      <Footer></Footer>
    </div>
  )
}

export default Projects