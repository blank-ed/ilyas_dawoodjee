import React from 'react'
import './About.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MyImage from '../components/website_data/me.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import WorkExperienceData from '../components/website_data/WorkExperienceData';
import EducationData from '../components/website_data/EducationData';
import PublicationData from '../components/website_data/PublicationData';


function About() {
  return (
    <div className='About Page'>
      <NavBar selected="about"></NavBar>
      <div className="About_Container">
        <div className="About_Avatar">
          <img src={MyImage} alt="Ilyas's Headshot" />
          <p className='shade'>Ilyas Dawoodjee, Engineer</p>
        </div>
        <div className='About_Paragraph'>
          <p className='body'>
            I am Ilyas Dawoodjee, currently a MSc Mechanical Engineering student at University of Manitoba where I research in the Intelligent Digital Manufacturing Laboratory (IDML). My area of research involves computer vision and machine learning integrated with industrial robots. I have experience involving the detection of physiological signals using computer vision and digial signal processing.
            I am constantly trying to learn new things, especially when it comes to coding. My main language is Python.
          </p>

          {/* <p>I am Ilyas Dawoodjee, currently an MSc student at University of Mantioba studying Mechanical Engineering. I am a member of the <a href="">IDM Lab</a> under the supervision of <a href="">Prof. Matt Khoshdarregi</a>. My expertise is in Computer Vision, Machine Learning, and Robotics.</p> */}
          {/* I am currently working on integrating a 3D vision camera with a robot arm, enabling me to control the arm using the captured frames, which is known as hand-to-eye calibration. */}
        </div>
        <div className="About_Main_Section">
          <h1 className="About_Main_Section_Title">
            <FontAwesomeIcon className='Title_Icon' icon={faBriefcase} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Work Experience
          </h1>
          <WorkExperienceSection WorkExperienceData={WorkExperienceData} />
        </div>

        <div className="About_Main_Section">
          <h1 className="About_Main_Section_Title">
            <FontAwesomeIcon className='Title_Icon' icon={faGraduationCap} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Education
          </h1>
          <EducationSection EducationData={EducationData} />
        </div>

        <div className="About_Main_Section">
          <h1 className="About_Main_Section_Title">
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

export default About

function WorkExperienceSection({ WorkExperienceData }) {
  return (
    <>
      {WorkExperienceData.map((data, index) => (
        <div className="About_Each_Section" key={index}>
          <div className="Each_Section_Header">
            <span className="Each_Section_Title">{data.jobTitle}</span>
            <span className='Each_Section_Date shade'>{data.jobDuration}</span>
          </div>
          <span className="Each_Section_SubHeader body">
            {data.jobWebsite ? (
              <><a href={data.jobWebsite} target='_blank' rel='noopener noreferrer'>{data.jobPlace}</a>, </>
            ) : (
              <>{data.jobPlace}</>
            )}
            {data.jobUniversity && <>{data.jobUniversity}</>}
            <>, {data.jobLocation}</>
          </span>
          <span className="Each_Section_Information body">
            <table>
              <tbody>
                {data.jobPoints.map((dataPoints, index) => (
                  <tr key={`row-${index}`}>
                    <td className='point_number'>•&nbsp;&nbsp;&nbsp;</td>
                    <td className='point_data'>{dataPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        <div className="About_Each_Section" key={index}>
          <div className="Each_Section_Header">
            <span className="Each_Section_Title">{data.educationTitle}</span>
            <span className='Each_Section_Date shade'>{data.educationDuration}</span>
          </div>
          <span className="Each_Section_SubHeader body">
            {data.educationLabWebsite ? (
              <><a href={data.educationLabWebsite} target='_blank' rel='noopener noreferrer'>{data.eudcationLabPlace}</a>, </>
            ) : (
              <>{data.eudcationLabPlace}</>
            )}
            {data.educationUniversity && <>{data.educationUniversity}</>}
            <>, {data.educationLocation}</>
          </span>
          <span className="Each_Section_Information body">
            <table>
              <tbody>
                {data.educationPoints.map((dataPoints, index) => (
                  <tr key={`row-${index}`}>
                    <td className='point_number'>•&nbsp;&nbsp;&nbsp;</td>
                    <td className='point_data' dangerouslySetInnerHTML={{ __html: dataPoints }}></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        <div className="About_Each_Section" key={index}>
          <span className="Each_Section_Information body">{data.publicationTitle}
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