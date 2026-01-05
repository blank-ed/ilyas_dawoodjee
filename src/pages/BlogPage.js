import React, { useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import './BlogPage.css';

import BlogPage3Data from '../website_data/BlogPage3Data/BlogPage3Data';
import BlogPage1Data from '../website_data/BlogPage1Data/BlogPage1Data';
import BlogPage2Data from '../website_data/BlogPage2Data/BlogPage2Data';
import BlogData from '../website_data/BlogData';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Collapsable from '../components/Collapsable';
import CodeBlock from '../components/CodeBlock';
import TableofContent from '../components/TableofContent';

const blogPages = [BlogPage3Data, BlogPage2Data, BlogPage1Data];

const blogDataMapping = BlogData.reduce((acc, article, index) => {
  const words = article.article_title.split(' ')
    .map(word => word.replace(/:/g, '')) // remove colons
    .filter(word => /^[A-Za-z]+$/.test(word)); // filter only words with letters A-Z or a-z
  const id = words.slice(0, 4).join('_').toLowerCase(); // use first 4 valid words
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
    setTimeout(() => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          const isFigure = element.classList && Array.from(element.classList).some(className => className.endsWith('_FigName'));
          element.scrollIntoView({ behavior: 'smooth', block: isFigure ? 'end' : 'start' });
        }
      } else {
        // Scroll to the top of the page container smoothly
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 100);
  }, [location.pathname, location.hash]);


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
      case 'Equation':
        return <InlineMath math={element.data} key={`equation-${uniqueKey}`} />;
      case 'img':
        return (
          <div>
            <img src={element.data[0]} className={element.className} key={`${element.className}-${uniqueKey}`} alt="" style={element.data[2] ? { width: element.data[2].width, height: element.data[2].height } : {}} />
            <span id={element.id} className={`body ${element.className}_FigName`} key={`${element.type}-${uniqueKey}`}>{element.data[1]} {element.data[3] && renderData(element.data[3], `${uniqueKey}-extra`)}</span>
          </div>
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
        const isExternal = element.to.startsWith('https');
        return (
          <Link to={element.to} className={element.className} key={`${element.className}-${uniqueKey}`} id={element.id} {...(isExternal ? { target: '_blank' } : {})}>
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
      case 'Space':
        return (
          <br />
        )
      case 'a':
        return element.className === 'folder blog_links' ? (
          <a className={element.className} key={`${element.className}-${uniqueKey}`} onClick={(event) => handleFolderClick(element.data, event)} href="#">
            {element.data}
          </a>
        ) : element.className === 'tag blog_links_inverse' ? (
          <a className={element.className} key={`${element.className}-${uniqueKey}`} onClick={(event) => handleTagClick(element.data, event)} href='#'>
            {element.data}
          </a>
        ) : (
          <a href={element.href} className={element.className} key={`${element.className}-${uniqueKey}`} target='_blank'>
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
      case 'ol':
        return (
          <ol key={`${element.type}-${uniqueKey}`}>
            {element.data.map((child, childIndex) => renderData(child, childIndex, uniqueKey))}
          </ol>
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
      case 'em':
        return (
          <em key={`${element.type}-${uniqueKey}`}>{element.data}</em>
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
      case 'bullet_points':
        return (
          <>{element.data}&nbsp;&nbsp;&nbsp;</>
        );
      case 'unique_code':
        return (
          <div className={element.className}>
            {element.data}
          </div>
        )
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
