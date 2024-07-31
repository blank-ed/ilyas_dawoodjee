import React, { useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BlogPage.css';
import BlogPage1Data from '../components/website_data/BlogPage1Data/BlogPage1Data';
import BlogPage2Data from '../components/website_data/BlogPage2Data/BlogPage2Data';
import BlogPage3Data from '../components/website_data/BlogPage3Data/BlogPage3Data';
import BlogPage4Data from '../components/website_data/BlogPage4Data/BlogPage4Data';
import BlogPage5Data from '../components/website_data/BlogPage5Data/BlogPage5Data';
import BlogData from '../components/website_data/BlogData';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Collapsable from '../components/Collapsable';
import CodeBlock from '../components/CodeBlock';
import TableofContent from '../components/TableofContent';

const blogPages = [BlogPage1Data, BlogPage2Data, BlogPage3Data, BlogPage4Data, BlogPage5Data];

const blogDataMapping = BlogData.reduce((acc, article, index) => {
  const words = article.article_title.split(' ');
  const id = `${words[0]}_${words[1]}_${words[2]}${words[3]}`.toLowerCase();
  acc[id] = blogPages[index];
  return acc;
}, {});

function BlogPage() {
  const { blogId } = useParams();
  const pageRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const blogData = blogDataMapping[blogId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleFolderClick = (folderName, event) => {
    event.preventDefault();
    navigate(`/projects?folder=${folderName}`);
  };

  const handleTagClick = (tagName, event) => {
    event.preventDefault();
    const sanitizedTagName = tagName.replace(/,/g, '');
    navigate(`/projects?tag=${sanitizedTagName}`);
  };
  

  function renderData(element, index, parentIndex = '') {
    const uniqueKey = `${parentIndex}-${index}`;

    switch (element.type) {
      case 'div':
        return (
          <div className={element.className} key={`${element.className}-${uniqueKey}`}>
            {element.data.map((child, childIndex) => renderData(child, childIndex, uniqueKey))}
          </div>
        );
      case 'img':
        return (
          <img src={element.data} className={element.className} key={`${element.className}-${uniqueKey}`} alt="" />
        );
      case 'Collapsable':
        return (
          <Collapsable type={element.colType} title={element.title} extraText={Array.isArray(element.extraText) ? element.extraText.map((child, childIndex) => renderData(child, childIndex, uniqueKey)) : element.extraText} key={`${element.className}-${uniqueKey}`} />
        );
      case 'TableofContent':
        return (
          <TableofContent contentText={element.contentText} key={`${element.type}-${uniqueKey}`} />
        );
      case 'CodeBlock':
        return (
          <CodeBlock title={element.title} extraText={element.extraText} key={`${element.title}-${uniqueKey}`} />
        );
      case 'span':
        return (
          <span className={element.className} id={element.id} key={`${element.className}-${uniqueKey}`}>
            {element.icon && <FontAwesomeIcon icon={element.icon} />}
            {element.icon && <>&nbsp;&nbsp;</>}
            {Array.isArray(element.data) ? element.data.map((child, childIndex) => renderData(child, childIndex, uniqueKey)) : element.data}
          </span>
        );
      case 'Link':
        return (
          <Link to={element.to} className={element.className} key={`${element.className}-${uniqueKey}`}>
            {element.position === 'left' && element.icon && <FontAwesomeIcon icon={element.icon} />}
            {element.position === 'left' && element.icon && <>&nbsp;&nbsp;</>}
            {Array.isArray(element.data) ? element.data.map((child, childIndex) => renderData(child, childIndex, uniqueKey)) : element.data}
            {element.position === 'right' && <>&nbsp;&nbsp;</>}
            {element.position === 'right' && element.icon && <FontAwesomeIcon icon={element.icon} />}
          </Link>
        );
      case 'Text':
        return (
          <React.Fragment key={`${element.type}-${uniqueKey}`}>{element.data}</React.Fragment>
        );
      case 'a':
        return element.className === 'folder blog_links' ? (
          <a
            className={element.className}
            key={`${element.className}-${uniqueKey}`}
            onClick={(event) => handleFolderClick(element.data, event)}
            href="#"
          >
            {element.data}
          </a>
        ) : element.className === 'tag blog_links_inverse' ? (
          <a
            className={element.className}
            key={`${element.className}-${uniqueKey}`}
            onClick={(event) => handleTagClick(element.data, event)}
            href='#'
          >
            {element.data}
          </a>
        ) : (
          <a
            href={element.href}
            className={element.className}
            key={`${element.className}-${uniqueKey}`}
          >
            {element.data}
          </a>
        );


      case 'sup':
        return (
          <sup id={element.id} key={`${element.id}-${uniqueKey}`}>{element.data}</sup>
        );
      case 'ul':
        return (
          <ul key={`${element.type}-${uniqueKey}`}>
            {element.data.map((child, childIndex) => renderData(child, childIndex, uniqueKey))}
          </ul>
        );
      case 'li':
        return (
          <li key={`${element.type}-${uniqueKey}`}>
            {element.data.map((child, childIndex) => renderData(child, childIndex, uniqueKey))}
          </li>
        );
      case 'strong':
        return (
          <strong key={`${element.type}-${uniqueKey}`}>{element.data}</strong>
        );
      case 'table':
        return (
          <table className={element.className} key={`${element.className}-${uniqueKey}`}>
            <tbody>
              {element.data.map((row, rowIndex) => (
                <tr key={`row-${uniqueKey}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => renderData(cell, cellIndex, `${uniqueKey}-${rowIndex}`))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'td':
        return (
          <td className={element.className} id={element.id} key={`${element.className}-${uniqueKey}`}>
            {element.data.map((child, childIndex) => renderData(child, childIndex, uniqueKey))}
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
