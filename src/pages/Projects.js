import React, { useEffect, useState } from 'react';
import './Projects.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlogData from '../components/website_data/BlogData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faFolder, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';

function Projects() {
  const [selectedOptions, setSelectedOptions] = useState([{ label: 'Projects', value: 'projects' }]);
  const [data, setData] = useState([]);
  const [highlightedSection, setHighlightedSection] = useState(null);
  const location = useLocation();

  // Count tag occurrences and extract titles
  const tagCount = {};
  const tagTitles = {};
  
  BlogData.forEach((value) => {
    value.article_tags.forEach((tag) => {
      if (!tagCount[tag.tag_name]) {
        tagCount[tag.tag_name] = 0;
        tagTitles[tag.tag_name] = [];
      }
      tagCount[tag.tag_name]++;
      tagTitles[tag.tag_name].push(value.article_title);
    });
  });

  // Update the options dynamically and order by count
  const tagOptions = Object.keys(tagCount)
    .sort((a, b) => tagCount[b] - tagCount[a])
    .map(tag => ({
      label: `${tag} (${tagCount[tag]})`,
      value: `tag-${tag}`
    }));

  const options = [
    { label: 'Projects', value: 'projects' },
    { label: 'Publication Date', value: 'publication-date' },
    {
      label: 'Tags',
      options: tagOptions,
    },
  ];

  const handleChange = (selectedOptions) => {
    let newSelectedOptions = [{ label: 'Projects', value: 'projects' }]; // Always include "Projects"

    // Separate main options and tags
    const mainOptions = selectedOptions.filter(option => option.value === 'publication-date' || option.value === 'projects');
    const tagsOptions = selectedOptions.filter(option => option.value.startsWith('tag-'));

    // Ensure only one main option is selected
    if (mainOptions.length > 1) {
      newSelectedOptions = [mainOptions[1], ...tagsOptions]; // Keep the latest selected main option
    } else {
      newSelectedOptions = [...mainOptions, ...tagsOptions];
    }

    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tag = searchParams.get('tag');
    const folder = searchParams.get('folder');

    const initialSelectedOptions = [{ label: 'Projects', value: 'projects' }];
    if (tag) {
      initialSelectedOptions.push({ label: `${tag} (${tagCount[tag]})`, value: `tag-${tag}` });
    }
    if (folder) {
      setHighlightedSection(folder);
      setTimeout(() => setHighlightedSection(null), 2000); // Reset color after 2 seconds
    }

    setSelectedOptions(initialSelectedOptions);
  }, [location]);

  useEffect(() => {
    const mainOption = selectedOptions.find(option => option.value === 'publication-date' || option.value === 'projects');
    const selectedTags = selectedOptions.filter(option => option.value.startsWith('tag-')).map(option => option.value.replace('tag-', ''));

    let filteredData = BlogData;

    if (selectedTags.length > 0) {
      filteredData = BlogData.filter((value) =>
        value.article_tags.some(tag => selectedTags.includes(tag.tag_name))
      );
    }

    if (mainOption) {
      if (mainOption.value === 'publication-date') {
        const dict_dates = {};
        filteredData.forEach((value) => {
          const year = value.published_date.split(' ')[2];
          if (!dict_dates[year]) {
            dict_dates[year] = [];
          }
          dict_dates[year].push([value.article_title, value.folder_name, value.article_link]);
        });

        const sortedYears = Object.entries(dict_dates).sort(([a], [b]) => b - a);
        setData(
          sortedYears.map(([year, value]) => (
            <div key={year} className={highlightedSection === year ? 'highlight' : ''}>
              <span className="subTitle"><FontAwesomeIcon icon={faClock} />&nbsp;&nbsp;&nbsp;{year}</span>
              {value.map((item, index) => (
                <div className="all_data" key={index}>
                  <span className="data"><FontAwesomeIcon icon={faCircleDot} />&nbsp;&nbsp;&nbsp;<Link className='article_link' to={item[2]}>{item[0]}</Link></span>
                  <span className="data">{item[1]}</span>
                </div>
              ))}
            </div>
          ))
        );
      } else if (mainOption.value === 'projects') {
        const dict_projects = {};
        filteredData.forEach((value) => {
          if (!dict_projects[value.folder_name]) {
            dict_projects[value.folder_name] = [];
          }
          dict_projects[value.folder_name].push([value.article_title, value.published_date, value.article_link]);
        });

        setData(
          Object.entries(dict_projects).map(([key, value]) => (
            <div key={key} className={highlightedSection === key ? 'highlight' : ''}>
              <span className="subTitle"><FontAwesomeIcon icon={faFolder} />&nbsp;&nbsp;&nbsp;{key}</span>
              {value.map((item, index) => (
                <div className="all_data" key={index}>
                  <span className="data"><FontAwesomeIcon icon={faCircleDot} />&nbsp;&nbsp;&nbsp;<Link className={highlightedSection === key ? 'article_link highlight' : 'article_link'} to={item[2]}>{item[0]}</Link></span>
                  <span className="data">{item[1]}</span>
                </div>
              ))}
            </div>
          ))
        );
      }
    }
  }, [selectedOptions, highlightedSection]);

  const handleBlur = () => {
    if (selectedOptions.length === 0) {
      setSelectedOptions([{ label: 'Projects', value: 'projects' }]);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '4px',
      borderColor: 'green', // Change border color to green
      boxShadow: 'none',
      color: 'white',
      '&:hover': {
        borderColor: 'green', // Change hover border color to green
      },
      width: '30rem',
      backgroundColor: 'inherit' // Inherit background color
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure dropdown is on top
      color: 'white',
      border: '1px solid green', // Change dropdown border color to green
      backgroundColor: '#212121' // Inherit background color
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? 'gray' : null,
      color: state.isSelected ? '#fff' : '#495057',
      color: 'white',
      '&:hover': {
        backgroundColor: 'green',
      },
      paddingLeft: state.data.value.startsWith('tag-') ? '2rem' : '1rem' // Indent only tag options
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'inherit', // Inherit background color
      borderRight: '5px solid green',
      borderRadius: '0px'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white', // Change tag text color to white
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'green', // Change cross color to green
      '&:hover': {
        backgroundColor: 'transparent', // Ensure no background on hover
        color: 'darkgreen' // Change hover cross color to dark green
      }
    })
  };

  return (
    <div className='Projects Page'>
      <NavBar selected='projects'></NavBar>
      <div className="Projects_Container">
        <div className="Projects_Title_Section">
          <span className="Projects_Title">Projects</span>
          <Select
            value={selectedOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            options={options}
            className='Projects_Dropdown'
            styles={customStyles}
            isMulti
            placeholder="Select an option"
          />
        </div>
        <div className="Project_Contents">
          {data}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Projects;
