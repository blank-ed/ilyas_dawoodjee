import React, { useEffect, useState } from 'react';
import './CodeBlock.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

function CodeBlock({ type, title, extraText }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => setIsOpen(!isOpen);

    // // Helper function to determine the icon based on the type
    // const getIcon = (type) => {
    //     switch (type) {
    //         case 'python':
    //             return faTriangleExclamation;
    //         default:
    //             return faCircleExclamation; // Default icon
    //     }
    // };

    return (
        <div className="collapsableContainerCode">
            <button className="collapsableTitleCode" onClick={toggleCollapse}>
                <span className="button-title">
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />&nbsp;&nbsp;{title}
                </span>
                <FontAwesomeIcon icon={isOpen ? faCopy : faEllipsis} />
            </button>
            <div className={`collapsableContentCode ${isOpen ? 'open' : ''}`}>
                <ol>
                    {extraText.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default CodeBlock;