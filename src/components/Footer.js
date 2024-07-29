import React from 'react'
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faGoogleScholar } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFolderOpen, faUser } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';

function Footer({ ishomePage }) {
  return (
    <div className='Footer'>
      <div className="Footer_Sub">
        <div className={ishomePage === "yes" ? "homePage" : "notHomePage"}>
          <div className="Footer_Links">
            <a href="https://www.linkedin.com/in/ilyas-dawoodjee-858011195" target='_blank' rel='noreferrer'><FontAwesomeIcon className='Links' icon={faLinkedin} /></a>
            <a href="https://github.com/blank-ed" target='_blank' rel='noreferrer'><FontAwesomeIcon className='Links' icon={faGithub} /></a>
            <a href="mailto:ilyas.esack.dawoodjee@gmail.com" target='_blank' rel='noreferrer'><FontAwesomeIcon className='Links' icon={faEnvelope} /></a>
            <a href="https://scholar.google.com/citations?user=FlonsoAAAAAJ&hl=en" target='_blank' rel='noreferrer'><FontAwesomeIcon className='Links' icon={faGoogleScholar} /></a>
          </div>
        </div>
        <p>© 2024 Ilyas Dawoodjee</p>
      </div>
    </div>
  )
}

export default Footer