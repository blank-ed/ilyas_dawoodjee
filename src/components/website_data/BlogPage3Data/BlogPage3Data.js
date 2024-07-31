import TestImage from '../test.jpg'
import { faBars, faCalendarDays, faChevronLeft, faChevronRight, faClock, faFolderOpen, faPen, faSection, faTag } from '@fortawesome/free-solid-svg-icons';
import BlogData from '../BlogData';

const BlogIndex = 2;

const BlogPage3Data = [
    // Title Section
    {
        type: 'div', className: 'BlogPage_TitleSection', data: [
            { type: 'span', className: 'mainTitle', data: `${BlogData[BlogIndex].article_title}` },
            {
                type: 'div', className: 'BlogPage_SubTitleSection', data: []
            },
            {
                type: 'div', className: 'blog_tags', data: [
                    { type: 'span', className: 'sub-body', icon: faTag },
                    ...BlogData[BlogIndex].article_tags.map((tag, index) => ({
                        type: 'span', className: 'sub-body', data: [{ type: 'a', className: 'tag blog_links_inverse', data: `${tag.tag_name}${index < BlogData[BlogIndex].article_tags.length - 1 ? ', ' : ''}` }]
                    }))
                ]
            },
            {
                type: 'TableofContent', contentText: [
                    { title: 'Summary', type: 'Title', section_link: '#summary' },
                    { title: 'Prerequisites', type: 'Title', section_link: '#first' },
                    { title: 'Installing MediaPipe Model Maker', type: 'SubTitle', section_link: '#first_first' },
                    { title: 'Getting the data', type: 'SubTitle', section_link: '#first_second' },
                    { title: 'Data preparation', type: 'SubTitle', section_link: '#first_third' },
                    { title: 'References', type: 'Title', section_link: '#references' },
                ]
            },
            { type: 'img', className: 'Blog_Image', data: TestImage },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'MediaPipe' },
                    { type: 'Link', to: '#ref_1', className: 'blog_links', data: [{ type: 'sup', id: 'intext_ref_1', data: '[1]' }] },
                    { type: 'Text', data: ' is an amazing library of ready-to-use deep learning models for common tasks in various domains.' },
                    { type: 'a', href: "https://www.samproell.io/posts/ai/mediapipe-update-2023/", className: 'blog_links', data: " My previous post" },
                    { type: 'Text', data: ' highlights how you can use it to easily detect facial landmarks. There are many' },
                    { type: 'a', href: "https://ai.google.dev/edge/mediapipe/solutions/guide#available_solutions", className: 'blog_links', data: " other solutions" },
                    { type: 'Text', data: ' available to explore. In this post however, I want to take a look at another feature, the' },
                    { type: 'a', href: "https://ai.google.dev/edge/mediapipe/solutions/guide#available_solutions", className: 'blog_links', data: " MediaPipe Model Maker" },
                    { type: 'Text', data: '. Model maker allows you to extend the functionality of some MediaPipe solutions by customizing models to your specific use case. With only a few lines of code, you can fine tune models and rewire the internals to accommodate new targets.' }
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'In this particular example, we will customize the hand gesture recognition' },
                    { type: 'Link', to: '#ref_2', className: 'blog_links', data: [{ type: 'sup', id: 'intext_ref_2', data: '[2]' }] },
                    { type: 'Text', data: ' task to build a model for reading the' },
                    { type: 'a', href: "https://www.samproell.io/posts/ai/mediapipe-update-2023/", className: 'blog_links', data: " American Sign Language (ASL)" },
                    { type: 'Text', data: ' fingerspelling alphabet. We are going to learn how a basic solution can be created with small effort. But we will also see that there are limitations to the (current) functionality of the MediaPipe Model Maker.' },
                ]
            },
            { type: 'img', className: 'Blog_Image', data: TestImage },
            { type: 'Collapsable', colType: 'warning', title: 'Warning', extraText: 'Here is some more detailed information that you can see when the component is expanded.' },
            { type: 'Collapsable', colType: 'information', title: 'Information', extraText: 'Here is some more detailed information that you can see when the component is expanded.' },
            { type: 'Collapsable', colType: 'question', title: 'Question', extraText: 'Here is some more detailed information that you can see when the component is expanded.' }
        ]
    },

    // Content Section
    {
        type: 'div', className: 'BlogPage_ContentSection', data: [
            // Summary Section
            { type: 'span', className: 'section_title sectionIcon', id: 'summary', icon: faSection, data: 'Summary' },
            { type: 'span', className: 'body', data: 'Here is a quick overview of the required steps to customize the gesture recognition task for a new problem. The approach is the same for the more general image classification task.' },
            {
                type: 'ul', data: [
                    { type: 'li', data: [{ type: 'strong', data: 'Get or create some data. ' }, { type: 'Text', data: 'Image files for each class must be provided in a separate sub folder. The folder names are used as class labels' }] },
                    { type: 'li', data: [{ type: 'strong', data: 'Preprocess images' }, { type: 'Text', data: ' by calling ' }, { type: 'span', className: 'code', data: 'Dataset.from_folder' },] },
                    { type: 'li', data: [{ type: 'strong', data: 'Set hyper-parameters' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'HParams' }, { type: 'Text', data: ' and ' }, { type: 'span', className: 'code', data: 'ModelOptions' }] },
                    { type: 'li', data: [{ type: 'strong', data: 'Fine tune the model' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'GestureRecognizer.create' },] },
                    { type: 'li', data: [{ type: 'strong', data: 'Evaluate performance' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'model.evaluate' },] },
                    { type: 'li', data: [{ type: 'strong', data: 'Export the model' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'model.export_model' },] },
                ]
            },
            { type: 'span', className: 'body', data: "Beyond the basic steps, we are going to take a look at the hand gesture embeddings, which MediaPipe uses under the hood and we will also perform a more thorough evaluation of the model's accuracy" },

            // First Section
            { type: 'span', className: 'section_title sectionIcon', id: 'first', icon: faSection, data: 'Prerequisites' },
            { type: 'span', className: 'body', data: 'Before getting started with the main code, we need to take care of some external resources. First, the Model Maker does not come with the default MediaPipe installation, so we need to install it separately. Next we also need to get some data to train the ASL alphabet detector. MediaPipe will work directly from the files on disk, so some minor preprocessing on the dataset is also needed.' },

            // First-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'first_first', icon: faBars, data: 'Installing MediaPipe Model Maker' },
            { type: 'span', className: 'body', data: 'Installing is straightforward with pip. Note that the installation might not succeed on Windows. If you are on Windows, you can use the Windows Subsystem for Linux (WSL) instead.' },
            { type: 'CodeBlock', title: 'Shell', extraText: [[{ type: 'shell', code: "pip install mediapipe mediapipe-model-maker" }]] },

            // First-Second Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'first_second', icon: faBars, data: 'Getting the data' },
            { type: 'span', className: 'body', data: 'For this example, I am going to use the SigNN Character Database from Kaggle. It contains 8442 images showing 24 characters of the english alphabet. The dataset excludes J and Z, because they are differentiated from other characters through motion (see the image below the post). The dataset was originally created to build a mobile ASL alphabet translator - which basically does what I am creating in this post, only better. The dataset creators have a detailed description of their solution, so definitely check it out and star their page.' },
            { type: 'span', className: 'body', data: 'To download the dataset yourself, you need a Kaggle account (which is free). With 1.8GB it is fairly manageable. Before getting started, we will need to do some minor preprocessing, to make it work seamlessly with MediaPipe Model Maker.' },

            // First-Third Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'first_third', icon: faBars, data: 'Data preparation' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: "According to the Model Maker documentation, only a small number of training examples is required to retrain/fine tune the models. Approximately 100 examples per class should be sufficient. The easiest way to provide the data to the Model Maker is through a " },
                    { type: 'span', className: 'code', data: 'from_folder' },
                    { type: 'Text', data: " method. It scans the given folder, interprets any subdirectory as target classes and any containing (image) files as instances of that class. The SigNN dataset is already provided in this format." }
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: "In addition, MediaPipe requires a " },
                    { type: 'span', className: 'code', data: '"none"' },
                    { type: 'Text', data: " class for training, which should include examples that do not show any of the target labels. Training will not run without it. We can create an empty folder called " },
                    { type: 'span', className: 'code', data: '"none"' },
                    { type: 'Text', data: " within the training directory. This will allow us to run the training, although it would probably be better to provide actual negative examples." }
                ]
            },
            { type: 'span', className: 'body', data: 'We could start training with this dataset immediately. But data processing with the Model Maker is quite slow, so I do not want to work with the full dataset. Unfortunately, the MediaPipe interface has no straightforward way to control how much data is used. The easiest way I have found is to simply copy a the desired number of samples to a separate folder on disk. The following script, allows us to extract multiple non-overlapping subsets, including a heldout test set from the original dataset.' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'd', code: '"""Extract a sample from the ASL Alphabet dataset."""' }],
                    [{ type: '', code: '' }],
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' pathlib' }],
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' shutil' }],
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' typing' }],
                    [{ type: '', code: '' }],
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' click' }],
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' numpy' }, { type: 'a', code: ' as' }, { type: 'b', code: ' np' }],
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' tqdm' }],
                    [{ type: '', code: '' }],
                    [{ type: '', code: '' }],
                    [{ type: 'a', code: 'def' }, { type: 'g', code: ' process_split_sizes' }, { type: 'b', code: '(splits: typing.Sequence[str]) -> typing.Dict[str, int]:' }],
                    [{ type: 'a', code: '    return' }, { type: 'b', code: '{s[' }, { type: 'h', code: '0' }, { type: 'b', code: ']: int(s[' }, { type: 'h', code: '1' }, { type: 'b', code: ']) ' }, { type: 'a', code: 'for ' }, { type: 'b', code: 's ' }, { type: 'a', code: 'in ' }, { type: 'b', code: 'map(' }, { type: 'a', code: 'lambda ' }, { type: 'b', code: 'x: x.split(' }, { type: 'c', code: '":"' }, { type: 'b', code: '), splits)}' }],
                    [{ type: 'a', code: '    return' }, { type: 'b', code: '{s[' }, { type: 'h', code: '0' }, { type: 'b', code: ']: int(s[' }, { type: 'h', code: '1' }, { type: 'b', code: ']) ' }, { type: 'a', code: 'for ' }, { type: 'b', code: 's ' }, { type: 'a', code: 'in ' }, { type: 'b', code: 'map(' }, { type: 'a', code: 'lambda ' }, { type: 'b', code: 'x: x.split(' }, { type: 'c', code: '":"' }, { type: 'b', code: '), splits)}' }]
                ]
            },

            // References
            { type: 'span', className: 'section_title reference_section_title sectionIcon', id: 'references', icon: faSection, data: 'References' },
            {
                type: 'table', className: 'reference_section_table', data: [
                    [
                        {
                            type: 'td', className: 'body reference', id: 'ref_1', data: [
                                { type: 'Text', data: "1. C. Lugaresi et al., “MediaPipe: A Framework for Building Perception Pipelines,” 2019, " },
                                { type: 'a', href: "", className: "blog_links", data: "arXiv:1906.08172v1" },
                                { type: 'Text', data: '. ' },
                                { type: 'Link', to: '#intext_ref_1', className: "blog_links", data: "↩" }
                            ]
                        }
                    ],
                    [
                        {
                            type: 'td', className: 'body reference', id: 'ref_2', data: [
                                { type: 'Text', data: "2. C. Lugaresi et al., “MediaPipe: A Framework for Building Perception Pipelines,” 2019, " },
                                { type: 'a', href: "", className: "blog_links", data: "arXiv:1906.08172v1" },
                                { type: 'Text', data: '. ' },
                                { type: 'Link', to: '#intext_ref_2', className: "blog_links", data: "↩" }
                            ]
                        }
                    ]
                ]
            },

            // Footer
            {
                type: 'span', className: 'blog_footer', data: [
                    { type: 'span', className: 'body footer_left', data: [{ type: "Link", className: 'blog_links_inverse', to: `${BlogData[1].article_link}`, icon: faChevronLeft, position: 'left', data: `${BlogData[1].article_title}` }] },
                    { type: 'span', className: 'body footer_right', data: [{ type: "Link", className: 'blog_links_inverse', to: `${BlogData[3].article_link}`, icon: faChevronRight, position: 'right', data: `${BlogData[3].article_title}` }] }
                ]
            }
        ]
    }
]

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

const wordCount = extractAndCountWords(BlogPage3Data);;
const timeTaken = Math.ceil(wordCount / 200);

BlogPage3Data[0].data[1].data.push(
    { type: 'span', className: 'date sub-body', icon: faCalendarDays, data: `${BlogData[BlogIndex].published_date}` },
    { type: 'span', className: 'words sub-body', icon: faPen, data: `${wordCount} words` },
    { type: 'span', className: 'time sub-body', icon: faClock, data: `${timeTaken} minutes` },
    { type: 'span', className: 'folder sub-body', icon: faFolderOpen, data: [{ type: 'a', className: 'folder blog_links', data: `${BlogData[BlogIndex].folder_name}` }] }
);

export default BlogPage3Data;