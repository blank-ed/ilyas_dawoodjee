import React, { useEffect, useState } from 'react';
import './CodeBlock.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

function CodeBlock({ type, title, extraText }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => setIsOpen(!isOpen);

    return (
        <div className="collapsableContainerCode">
            <button className="collapsableTitleCode" onClick={toggleCollapse}>
                <span className="button-title">
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />&nbsp;&nbsp;{title}
                </span>
                <FontAwesomeIcon icon={isOpen ? faCopy : faEllipsis} />
            </button>
            <div className={`collapsableContentCode ${isOpen ? 'open' : ''}`}>
                <table>
                    <tbody>
                        {extraText.map((text, index) => (
                            <tr key={index}>
                                <td className='codeNumber'>{index + 1}</td>
                                <td className='codeText'>{
                                    text.map((item, idx) => (
                                        <span key={idx} className={`${item.type}`}>{`${item.code}`}</span>
                                    ))
                                }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CodeBlock;
