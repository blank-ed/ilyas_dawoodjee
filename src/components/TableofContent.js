import React, { useEffect, useState } from 'react';
import './TableofContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTable } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function TableofContent({ contentText }) {
    const [isOpen, setIsOpen] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    const toggleCollapse = () => setIsOpen(!isOpen);

    const location = useLocation();

    useEffect(() => {
        if (!initialLoad && location.hash) {
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                const yOffset = -70;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
        setInitialLoad(false);
    }, [location]);

    return (
        <div className={`tableofcontentContainer`}>
            <button className={`tableofcontentTitle`} onClick={toggleCollapse}>
                <span className="button-title body">
                    <FontAwesomeIcon icon={faTable} />&nbsp;&nbsp;TABLE OF CONTENTS
                </span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </button>
            <div className={`tableofcontentContent ${isOpen ? 'open' : ''}`}>
                {contentText.map((value, index) => (
                    <Link to={`${value.section_link}`} className={`${value.type} tableofcontentsText body`} key={`${index}`}>
                        {value.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TableofContent;
