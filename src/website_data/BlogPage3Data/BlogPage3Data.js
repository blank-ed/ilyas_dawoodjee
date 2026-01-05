import React, { useState, Suspense, useRef } from 'react';
import { faBars, faSection } from '@fortawesome/free-solid-svg-icons';

// Importing blog data overview and necessary components
import { footer_content, blogpage_subtitle_content, blogpage_title_content, blogpage_references_content } from '../GeneralBlogPageData';

// Import figures
import UnderConstruction from '../underconstruction.png'

const BlogIndex = 0;

// For Table of Contents
const tocItems = [
    
];
const titleContent = blogpage_title_content({ BlogIndex: BlogIndex, tocItems: tocItems });

const sectionLinks = [...titleContent.sectionLinks];
const tocTitles = [...titleContent.tocTitles];

// For References
const ReferencesItems = [
    
];

const referencesContent = blogpage_references_content({ ReferencesItems: ReferencesItems });

const BlogPage3Data = [
    // Title Section
    titleContent,

    // Content Section
    {
        type: 'div', className: 'BlogPage_ContentSection', data: [
            // Summary Section
            { type: 'span', className: 'section_title sectionIcon', id: 'summary', icon: faSection, data: 'Summary' },
            { type: 'img', id: '', className: 'Blog_Image', data: [UnderConstruction] },
            { type: 'img', id: '', className: 'Blog_Image', data: ['https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2JtbXlkbG82MjVvcjAyemhyZTR0NzZsOWxnaXNpdWkwdXNiMXdtNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7NoNw4pMNTvgc/giphy.gif'] },

            // Conclusion Section
            { type: 'span', className: 'section_title sectionIcon', id: 'conclusion', icon: faSection, data: 'Conclusion' },

            // References
            { type: 'span', className: 'section_title reference_section_title sectionIcon', id: 'references', icon: faSection, data: 'References' },
            referencesContent,

            // Footer
            footer_content({ BlogIndex: BlogIndex, previous_link: false, next_link: true })
        ]
    }
]

// Add subtitle content (published date, word count, reading time, and folder name)
blogpage_subtitle_content({ BlogIndex: BlogIndex, BlogPageData: BlogPage3Data })

export default BlogPage3Data;