import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BlogPage.css';
import BlogPage1Data from '../components/website_data/BlogPage1Data';
import BlogPage2Data from '../components/website_data/BlogPage2Data';
import BlogPage3Data from '../components/website_data/BlogPage3Data';
import BlogPage4Data from '../components/website_data/BlogPage4Data';
import BlogPage5Data from '../components/website_data/BlogPage5Data';
import BlogData from '../components/website_data/BlogData';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Collapsable from '../components/Collapsable';
import CodeBlock from '../components/CodeBlock';
import TableofContent from '../components/TableofContent';

// const blogDataMapping = {
//   facial_landmark_detection1: BlogPage1Data,
//   facial_landmark_detection2: BlogPage2Data,
//   facial_landmark_detection3: BlogPage3Data,
//   facial_landmark_detection4: BlogPage4Data,
//   facial_landmark_detection5: BlogPage5Data,
// };

function BlogPage() {
  const { blogId } = useParams();
  const pageRef = useRef(null);
  const location = useLocation();

  // const blogData = blogDataMapping[blogId];
  const blogData = BlogData.find(blog => blog.article_link.endsWith(blogId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  function renderData(element, index) {
    switch (element.type) {
      case 'div':
        return (
          <div className={element.className} key={`${element.className}-${index}`}>
            {element.data.map(renderData)}
          </div>
        );
      case 'img':
        return (
          <img src={element.data} className={element.className} key={`${element.className}-${index}`} alt="" />
        );
      case 'Collapsable':
        return (
          <Collapsable type={element.colType} title={element.title} extraText={element.extraText} key={`${element.className}-${index}`} />
        );
      case 'TableofContent':
        return (
          <TableofContent contentText={element.contentText} key={`${element.type}-${index}`} />
        );
      case 'CodeBlock':
        return (
          <CodeBlock title={element.title} extraText={element.extraText} key={`${element.title}-${index}`} />
        );
      case 'span':
        return (
          <span className={element.className} id={element.id} key={`${element.className}-${index}`}>
            {element.icon && <FontAwesomeIcon icon={element.icon} />}
            {element.icon && <>&nbsp;&nbsp;</>}
            {Array.isArray(element.data) ? element.data.map((child, childIndex) => renderData(child, `${index}-${childIndex}`)) : element.data}
          </span>
        );
      case 'Link':
        return (
          <Link to={element.to} className={element.className} key={`${element.className}-${index}`}>
            {element.position === 'left' && element.icon && <FontAwesomeIcon icon={element.icon} />}
            {element.position === 'left' && element.icon && <>&nbsp;&nbsp;</>}
            {Array.isArray(element.data) ? element.data.map((child, childIndex) => renderData(child, `${index}-${childIndex}`)) : element.data}
            {element.position === 'right' && <>&nbsp;&nbsp;</>}
            {element.position === 'right' && element.icon && <FontAwesomeIcon icon={element.icon} />}
          </Link>
        );
      case 'Text':
        return (
          <>{element.data}</>
        );
      case 'a':
        return (
          <a href={element.href} className={element.className} key={`${element.className}-${index}`}>{element.data}</a>
        );
      case 'sup':
        return (
          <sup id={element.id} key={`${element.id}-${index}`}>{element.data}</sup>
        );
      case 'ul':
        return (
          <ul key={`${element.type}-${index}`}>
            {element.data.map((child, childIndex) => renderData(child, `${index}-${childIndex}`))}
          </ul>
        );
      case 'li':
        return (
          <li key={`${element.type}-${index}`}>
            {element.data.map((child, childIndex) => renderData(child, `${index}-${childIndex}`))}
          </li>
        );
      case 'strong':
        return (
          <strong key={`${element.type}-${index}`}>{element.data}</strong>
        );
      case 'table':
        return (
          <table className={element.className} key={`${element.className}-${index}`}>
            <tbody>
              {element.data.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => renderData(cell, `${index}-${rowIndex}-${cellIndex}`))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'td':
        return (
          <td className={element.className} id={element.id} key={`${element.className}-${index}`}>
            {element.data.map((child, childIndex) => renderData(child, `${index}-${childIndex}`))}
          </td>
        );
      default:
        return null;
    }
  }

  return (
    <div className='BlogPage Page' ref={pageRef}>
      <NavBar selected='blog'></NavBar>
      <div className="BlogPage_Container">
        {blogData.map(renderData)}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default BlogPage;
