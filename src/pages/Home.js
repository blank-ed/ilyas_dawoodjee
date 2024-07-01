import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faGoogleScholar } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFolderOpen, faUser } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MyImage from '../components/website_data/me.jpg'

import BlogData from '../components/website_data/BlogData';

function Home() {
  return (
    <div className='Home'>
      <NavBar></NavBar>
      <div className="Home_Container">
        <div className="Home_Profile">
          <div className="Home_Avatar">
            <Link to="/about">
              <img src={MyImage} alt="Ilyas's Headshot Picture" />
            </Link>
          </div>
          <div className="Home_Subtitle">
            <p>Computer Vision | Machine Learning | Deep Learning | Robotics | Digital Signal Processing | Data Science </p>
          </div>
          <div className="Home_Links">
            <a href="https://www.linkedin.com/in/ilyas-dawoodjee-858011195" target='_blank'><FontAwesomeIcon className='Links' icon={faLinkedin} /></a>
            <a href="https://github.com/blank-ed" target='_blank'><FontAwesomeIcon className='Links' icon={faGithub} /></a>
            <a href="mailto:ilyas.esack.dawoodjee@gmail.com" target='_blank'><FontAwesomeIcon className='Links' icon={faEnvelope} /></a>
            <a href="https://scholar.google.com/citations?user=FlonsoAAAAAJ&hl=en" target='_blank'><FontAwesomeIcon className='Links' icon={faGoogleScholar} /></a>
          </div>
          <div className="Home_Disclaimer">
            <p>Ilyas Dawoodjee - Personal Portfolio Homepage</p>
          </div>
        </div>
        {BlogData.map((data, index) => (
          <div className="article" key={index}>
            <div className="article_image">
              <Link to={data.article_link}><img src={data.image} alt="" /></Link>
            </div>
            <div className="article_title">
              <h1><Link to={data.article_link}>{data.article_title}</Link></h1>
            </div>
            <div className="article_subtitle">
              <span className='article_icon_text'>Published on {data.published_date} included in</span>
              &nbsp;
              <span><Link className='article_icon_link' to={data.published_folder}><FontAwesomeIcon className='Links' icon={faFolderOpen} /> {data.folder_name}</Link></span>
            </div>
            <div className="article_abstract">
              <p>{data.article_abstract}</p>
            </div>
            <div className="article_footer">
              <Link to={data.article_link}>Read More</Link>
              <p><FontAwesomeIcon className='article_icon' icon={faTag} />
                {data.article_tags.map((tag_name, index) => (
                  <Link to={tag_name.tag_link}> {tag_name.tag_name}{index !== data.article_tags.length - 1 && <span>, </span>}</Link>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer ishomePage="yes"></Footer>
    </div>
  )
}

export default Home