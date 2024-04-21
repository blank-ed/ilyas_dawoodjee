import React from 'react'
import './About.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MyImage from '../components/website_data/me.jpg'

function About() {
  return (
    <div className='About'>
      <NavBar selected="about"></NavBar>
      <div className="About_Container">
        <div className="About_Avatar">
          <img src={MyImage} alt="Ilyas's Headshot Picture" />
          <p>Ilyas Dawoodjee, Engineer</p>
        </div>
        <div className='About_Paragraph'>
          <p>
            I am Ilyas Dawoodjee, currently a MSc Mechanical Engineering student at University of Manitoba where I research in the Intelligent Digital Manufacturing Laboratory (IDML). My area of research involves computer vision and machine learning integrated with industrial robots. I have experience involving the detection of physiological signals using computer vision and digial signal processing.
            I am constantly trying to learn new things, especially when it comes to coding. My main language is Python. 
          </p>
          
          {/* <p>I am Ilyas Dawoodjee, currently an MSc student at University of Mantioba studying Mechanical Engineering. I am a member of the <a href="">IDM Lab</a> under the supervision of <a href="">Prof. Matt Khoshdarregi</a>. My expertise is in Computer Vision, Machine Learning, and Robotics.</p> */}
          {/* I am currently working on integrating a 3D vision camera with a robot arm, enabling me to control the arm using the captured frames, which is known as hand-to-eye calibration. */}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default About