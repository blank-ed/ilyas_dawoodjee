import React from 'react'
import './Resume.css';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import WorkExperienceData from '../components/website_data/WorkExperienceData';
import EducationData from '../components/website_data/EducationData';
import PublicationData from '../components/website_data/PublicationData';

function Resume() {
  return (
    <div className='Resume'>
      <NavBar selected='resume'></NavBar>
      <div className="Resume_Container">
        <div className="Resume_Main_Section">
          <h1 className="Resume_Main_Section_Title">
            <FontAwesomeIcon className='Title_Icon' icon={faBriefcase} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Work Experience
          </h1>
          <WorkExperienceSection WorkExperienceData={WorkExperienceData} />
        </div>

        <div className="Resume_Main_Section">
          <h1 className="Resume_Main_Section_Title">
            <FontAwesomeIcon className='Title_Icon' icon={faGraduationCap} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Education
          </h1>
          <EducationSection EducationData={EducationData} />
        </div>

        <div className="Resume_Main_Section">
          <h1 className="Resume_Main_Section_Title">
            <FontAwesomeIcon className='Title_Icon' icon={faBookOpen} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Publications
          </h1>
          <PublicationSection PublicationData={PublicationData} />
        </div>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default Resume

function WorkExperienceSection({ WorkExperienceData }) {
  return (
    <>
      {WorkExperienceData.map((data, index) => (
        <div className="Resume_Each_Section" key={index}>
          <div className="Each_Section_Header">
            <span className="Each_Section_Title">{data.jobTitle}</span>
            <span className='Each_Section_Date'>{data.jobDuration}</span>
          </div>
          <span className="Each_Section_SubHeader">
            {data.jobWebsite ? (
              <><a href={data.jobWebsite} target='_blank' rel='noopener noreferrer'>{data.jobPlace}</a>, </>
            ) : (
              <>{data.jobPlace}</>
            )}
            {data.jobUniversity && <>{data.jobUniversity}</>}
            <>, {data.jobLocation}</>
          </span>
          <span className="Each_Section_Information">
            <ul>
              {data.jobPoints.map((dataPoints, index) => (
                <li key={index}>{dataPoints}</li>
              ))}
            </ul>
          </span>
        </div>
      ))}
    </>
  );
}

function EducationSection({ EducationData }) {
  return (
    <>
      {EducationData.map((data, index) => (
        <div className="Resume_Each_Section" key={index}>
          <div className="Each_Section_Header">
            <span className="Each_Section_Title">{data.educationTitle}</span>
            <span className='Each_Section_Date'>{data.educationDuration}</span>
          </div>
          <span className="Each_Section_SubHeader">
            {data.educationLabWebsite ? (
              <><a href={data.educationLabWebsite} target='_blank' rel='noopener noreferrer'>{data.eudcationLabPlace}</a>, </>
            ) : (
              <>{data.eudcationLabPlace}</>
            )}
            {data.educationUniversity && <>{data.educationUniversity}</>}
            <>, {data.educationLocation}</>
          </span>
          <span className="Each_Section_Information">
            <ul>
              {data.educationPoints.map((dataPoints, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: dataPoints }}></li>
              ))}
            </ul>
          </span>
        </div>
      ))}
    </>
  );
}

function PublicationSection({ PublicationData }) {
  return (
    <>
      {PublicationData.map((data, index) => (
        <div className="Resume_Each_Section" key={index}>
          <span className="Each_Section_Information">{data.publicationTitle}
            {data.publicationWebsite ? (
              <><br />doi: <a href={data.publicationWebsite}>{data.publicationDoi}</a></>
            ) : (
              <></>
            )}
          </span>
        </div>
      ))}
    </>
  );
}