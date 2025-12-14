import React, { useState } from 'react';
import './CodeBlock.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

function CodeBlock({ title, extraText }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(true);

    const toggleCollapse = () => setIsOpen(!isOpen);

    const copyCodeToClipboard = (e) => {
        e.stopPropagation(); // Stop event propagation
        if (isOpen === true) {
            const codeText = extraText.map(line => line.map(item => item.code).join('')).join('\n');
            navigator.clipboard.writeText(codeText);

            setIsContentVisible(false);
            setTimeout(() => setIsContentVisible(true), 300); // Reappear after 0.3 seconds
        }
    };

    return (
        <div className="collapsableContainerCode">
            <div className="collapsableTitleCode">
                <button className="collapseButton" onClick={toggleCollapse}>
                    <span className="button-title body">
                        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />&nbsp;&nbsp;{title}
                    </span>
                </button>
                <FontAwesomeIcon className="copyIcon" icon={isOpen ? faCopy : faEllipsis} onClick={copyCodeToClipboard} />
            </div>
            <div className={`collapsableContentCode ${isOpen ? 'open' : ''} ${!isContentVisible ? 'hidden' : ''}`}>
                <table className='codeTable'>
                    <tbody>
                        {extraText.map((text, index) => (
                            <tr key={index}>
                                <td className='codeNumber'>{index + 1}</td>
                                <td className='codeText'>
                                    {Array.isArray(text) ? (
                                        text.map((item, idx) => (
                                            <span key={idx} className={`${item.type}`}>{`${item.code}`}</span>
                                        ))
                                    ) : (
                                        <span className="">{`${text}`}</span>
                                    )}
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CodeBlock;
