import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faGoogleScholar } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFolderOpen, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faArrowLeft, faTag } from '@fortawesome/free-solid-svg-icons';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MyImage from '../components/website_data/me.jpg'

import BlogData from '../components/website_data/BlogData';

function Home() {
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = BlogData.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(BlogData.length / postsPerPage);

  const updatePageInUrl = (newPage, updateUrl = true) => {
    setCurrentPage(newPage);
    if (updateUrl) {
      const url = new URL(window.location);
      url.searchParams.set('page', newPage);
      window.history.pushState({}, '', url);
    } else {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const nextPage = () => {
<<<<<<< HEAD
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
=======
    const newPage = currentPage < totalPages ? currentPage + 1 : currentPage;
    updatePageInUrl(newPage);
  };

  const prevPage = () => {
    const newPage = currentPage > 1 ? currentPage - 1 : currentPage;
    updatePageInUrl(newPage);
>>>>>>> 571e0bfbab953cafd416e423e9584e805042b18e
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  useEffect(() => {
    // This useEffect is only for cleanup when the component unmounts
    return () => {
      const url = new URL(window.location);
      url.searchParams.delete('page'); // Remove only the 'page' parameter
      window.history.replaceState({}, '', url.pathname + url.search + window.location.hash);
    };
  }, []);
  
  

  return (
    <div className='Home Page'>
      <NavBar></NavBar>
      <div className="Home_Container">
        <div className="Home_Profile">
          <div className="Home_Avatar">
            <Link to="/about">
              <img src={MyImage} alt="Ilyas's Headshot Picture" />
            </Link>
          </div>
          <div className="Home_Subtitle">
            <p>Computer Vision | Machine Learning | Deep Learning <br />Robotics | Digital Signal Processing | Data Science </p>
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
        {currentPosts.map((data, index) => (
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
        <div className="Home_pagination">
          <button className={totalPages === 1 ? "one_page" : "multiple_pages"} onClick={prevPage} disabled={currentPage === 1}><FontAwesomeIcon className='arrow_icon' icon={faArrowLeft} /></button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className={totalPages === 1 ? "one_page" : "multiple_pages"} onClick={nextPage} disabled={currentPage === totalPages}><FontAwesomeIcon className='arrow_icon' icon={faArrowRight} /></button>
        </div>
      </div>
      <Footer ishomePage="yes"></Footer>
    </div>
  )
}

export default Home