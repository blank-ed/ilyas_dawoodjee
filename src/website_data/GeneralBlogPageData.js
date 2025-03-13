import { faCalendarDays, faChevronLeft, faChevronRight, faClock, faFolderOpen, faPen, faTag } from '@fortawesome/free-solid-svg-icons';
import BlogData from './BlogData';

function footer_content({ BlogIndex, previous_link, next_link }) {
    const footerChildren = [];

    if (previous_link) {
        footerChildren.push({
            type: 'span', className: 'body footer_left', data: [
                { type: 'Link', className: 'blog_links_inverse', to: `${BlogData[BlogIndex - 1].article_link}`, icon: faChevronLeft, position: 'left', data: `${BlogData[BlogIndex - 1].article_title}` }
            ]
        });
    }

    if (next_link) {
        footerChildren.push({
            type: 'span', className: 'body footer_right', data: [
                { type: 'Link', className: 'blog_links_inverse', to: `${BlogData[BlogIndex + 1].article_link}`, icon: faChevronRight, position: 'right', data: `${BlogData[BlogIndex + 1].article_title}` }
            ]
        });
    }

    return { type: 'span', className: 'blog_footer', data: footerChildren };
}

function blogpage_subtitle_content({ BlogIndex, BlogPageData }) {
    let wordCount;
    let timeTaken;

    function extractAndCountWords(data) {
        let text = "";

        function traverse(data) {
            if (Array.isArray(data)) {
                data.forEach(item => traverse(item));
            } else if (typeof data === "object" && data !== null) {
                if (typeof data.data === 'string') {
                    text += data.data + " ";
                } else if (data.data) {
                    traverse(data.data);
                }
            }
        }

        traverse(data);
        return text.trim().split(/\s+/).length;
    }

    // Calculate word count and estimated reading time.
    wordCount = extractAndCountWords(BlogPageData);
    timeTaken = Math.ceil(wordCount / 200);

    // Append subtitle content elements to BlogPageData.
    BlogPageData[0].data[1].data.push(
        { type: 'span', className: 'date sub-body', icon: faCalendarDays, data: `${BlogData[BlogIndex].published_date}` },
        { type: 'span', className: 'words sub-body', icon: faPen, data: `${wordCount} words` },
        { type: 'span', className: 'time sub-body', icon: faClock, data: `${timeTaken} minutes` },
        { type: 'span', className: 'folder sub-body', icon: faFolderOpen, data: [{ type: 'a', className: 'folder blog_links', data: `${BlogData[BlogIndex].folder_name}` }] }
    );
}

function blogpage_title_content({ BlogIndex, tocItems }) {
    const ordinal = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
    let toc = [];
    let sectionLinks = [];

    // Always start with Summary
    sectionLinks.push('summary');
    toc.push({ title: 'Summary', type: 'Title', section_link: '#summary' });

    // Loop over each section in tocItems and create TOC entries
    tocItems.forEach((section, sectionIndex) => {
        // The first element is the main section title
        const mainLink = ordinal[sectionIndex];
        sectionLinks.push(mainLink);
        toc.push({ title: section[0], type: 'Title', section_link: '#' + mainLink });

        // Subsequent elements are treated as subtitles
        for (let j = 1; j < section.length; j++) {
            const subLink = mainLink + '_' + ordinal[j - 1];
            sectionLinks.push(subLink);
            toc.push({ title: section[j], type: 'SubTitle', section_link: '#' + subLink });
        }
    });

    // Append Conclusion and References
    sectionLinks.push('conclusion');
    toc.push({ title: 'Conclusion', type: 'Title', section_link: '#conclusion' });
    sectionLinks.push('references');
    toc.push({ title: 'References', type: 'Title', section_link: '#references' });

    let title_content = {
        type: 'div', className: 'BlogPage_TitleSection', data: [
            // Blog page title
            { type: 'span', className: 'mainTitle', data: `${BlogData[BlogIndex].article_title}` },

            // Blog page subtitle content (published date, word count, reading time, folder name)
            { type: 'div', className: 'BlogPage_SubTitleSection', data: [] },

            // Blog page tags
            {
                type: 'div', className: 'blog_tags', data: [
                    { type: 'span', className: 'sub-body', icon: faTag },
                    ...BlogData[BlogIndex].article_tags.map((tag, index) => ({
                        type: 'span', className: 'sub-body', data: [{ type: 'a', className: 'tag blog_links_inverse', data: `${tag.tag_name}${index < BlogData[BlogIndex].article_tags.length - 1 ? ', ' : ''}` }]
                    }))
                ]
            },

            // Blog page Table of Content using the generated toc
            { type: 'TableofContent', contentText: toc }
        ],
        sectionLinks: sectionLinks
    };

    return title_content;
}


export { footer_content, blogpage_subtitle_content, blogpage_title_content };