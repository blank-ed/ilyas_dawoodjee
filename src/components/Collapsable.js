import React, { useEffect, useState } from 'react';
import './Collapsable.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

function Collapsable({ type, title, extraText }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => setIsOpen(!isOpen);

    // Helper function to determine the icon based on the type
    const getIcon = (type) => {
        switch (type) {
            case 'warning':
                return faTriangleExclamation;
            case 'information':
                return faCircleExclamation;
            case 'question':
                return faCircleQuestion;
            default:
                return faCircleExclamation; // Default icon
        }
    };

    useEffect(() => {
        if (type === 'warning') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [type]);

    return (
        <div className={`${type}_container collapsableContainer`}>
            <button className={`${type}_title collapsableTitle`} onClick={toggleCollapse}>
                <span className="button-title body">
                    <FontAwesomeIcon icon={getIcon(type)} />&nbsp;&nbsp;{title}
                </span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </button>
            <div className={`${type}_content collapsableContent body ${isOpen ? 'open' : ''}`}>
                {extraText}
            </div>
        </div>
    );
}

export default Collapsable;
