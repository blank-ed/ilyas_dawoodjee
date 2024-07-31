import React from 'react'
import './Tags.css';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';

function Tags() {
  return (
    <div className='Tags Page'>
      <NavBar selected='tag'></NavBar>
      <div className="Tags_Container">
        ASDF
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Tags