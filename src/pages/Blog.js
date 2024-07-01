import React from 'react'
import './Blog.css';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';

function Blog() {
  return (
    <div className='Blog'>
      <NavBar selected='blog'></NavBar>
      <Footer></Footer>
    </div>
  )
}

export default Blog