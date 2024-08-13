import Image1 from './Image1.jpg'
import Image2 from './Image2.jpg'
import Image3 from './Image3.jpg'
import Image4 from './Image4.jpg'
import Image5 from './Image5.png'
import Image6 from './Image6.png'
import Image7 from './Image7.png'
import Image8 from './Image8.png'
import TestImage from '../test.jpg'
import { faBars, faCalendarDays, faChevronLeft, faChevronRight, faClock, faFolderOpen, faPen, faSection, faTag } from '@fortawesome/free-solid-svg-icons';
import BlogData from '../BlogData';

const BlogIndex = 0;

const BlogPage1Data = [
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

                    { title: 'Customizing the gesture recognition', type: 'Title', section_link: '#second' },
                    { title: 'Some utility functions', type: 'SubTitle', section_link: '#second_first' },
                    { title: 'Visualizing the data', type: 'SubTitle', section_link: '#second_second' },
                    { title: 'Ingesting the data', type: 'SubTitle', section_link: '#second_third' },
                    { title: 'Fine-tuning the gesture recognizer', type: 'SubTitle', section_link: '#second_fourth' },
                    { title: 'Exporting the customized model', type: 'SubTitle', section_link: '#second_fifth' },
                    { title: 'Applying the customized model', type: 'SubTitle', section_link: '#second_sixth' },

                    { title: 'Detailed performance evaluation', type: 'Title', section_link: '#third' },
                    { title: 'Confusion matrix', type: 'SubTitle', section_link: '#third_first' },
                    { title: 'Per-class accuracy', type: 'SubTitle', section_link: '#third_second' },

                    { title: 'Visualizing gesture embeddings', type: 'Title', section_link: '#fourth' },

                    { title: 'Conclusion', type: 'Title', section_link: '#conclusion' },

                    { title: 'References', type: 'Title', section_link: '#references' },
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image1 },
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
                    { type: 'Text', data: 'In this particular example, which particular example we will customize the hand gesture recognition task to build a model for reading the' },
                    { type: 'a', href: "https://www.samproell.io/posts/ai/mediapipe-update-2023/", className: 'blog_links', data: " American Sign Language (ASL)" },
                    { type: 'Text', data: ' fingerspelling alphabet. We are going to learn how a basic solution can be created with small effort. But we will also see that there are limitations to the (current) functionality of the MediaPipe Model Maker.' },
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image2 },
            { type: 'Collapsable', colType: 'warning', title: 'Preview release', extraText: 'Please beware that MediaPipe is still a preview in early release and changes might occur anytime.' },
            { type: 'Collapsable', colType: 'information', title: 'Compatibility issues on Windows', extraText: 'I was unable to make the MediaPipe Model Maker work on Windows directly. Instead, I ran the code for the following post on WSL with Ubuntu 22.04. It may or may not work on other operation systems/distributions. Unfortunately, there is little information in the documentation about compatibility.' },
        ]
    },

    // Content Section
    {
        type: 'div', className: 'BlogPage_ContentSection', data: [
            // Summary Section
            { type: 'span', className: 'section_title sectionIcon', id: 'summary', icon: faSection, data: 'Summary' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Here is a quick overview of the required steps to customize the gesture recognition task for a new problem. The approach is the same for the more general ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'image classification task' },
                    { type: 'Text', data: '.' }
                ]
            },
            {
                type: 'table', className: 'body', data: [
                    [{ type: 'td', data: [{ type: 'bullet_points', data: `•` }] },
                    { type: 'td', data: [{ type: 'strong', data: 'Get or create some data. ' }, { type: 'Text', data: 'Image files for each class must be provided in a separate sub folder. The folder names are used as class labels' }] }],
                    [{ type: 'td', data: [{ type: 'bullet_points', data: `•` }] },
                    { type: 'td', data: [{ type: 'strong', data: 'Preprocess images' }, { type: 'Text', data: ' by calling ' }, { type: 'span', className: 'code', data: 'Dataset.from_folder' },] }],
                    [{ type: 'td', data: [{ type: 'bullet_points', data: `•` }] },
                    { type: 'td', data: [{ type: 'strong', data: 'Set hyper-parameters' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'HParams' }, { type: 'Text', data: ' and ' }, { type: 'span', className: 'code', data: 'ModelOptions' }] }],
                    [{ type: 'td', data: [{ type: 'bullet_points', data: `•` }] },
                    { type: 'td', data: [{ type: 'strong', data: 'Fine tune the model' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'GestureRecognizer.create' },] }],
                    [{ type: 'td', data: [{ type: 'bullet_points', data: `•` }] },
                    { type: 'td', data: [{ type: 'strong', data: 'Evaluate performance' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'model.evaluate' },] }],
                    [{ type: 'td', data: [{ type: 'bullet_points', data: `•` }] },
                    { type: 'td', data: [{ type: 'strong', data: 'Export the model' }, { type: 'Text', data: ' with ' }, { type: 'span', className: 'code', data: 'model.export_model' },] }],
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
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'For this example, I am going to use the ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'SigNN Character Database' },
                    { type: 'Text', data: ' from Kaggle. It contains 8442 images showing 24 characters of the english alphabet. The dataset excludes J and Z, because they are differentiated from other characters through motion (see the ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'image here' },
                    { type: 'Text', data: '). The dataset was originally created to build a ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'mobile ASL alphabet translator' },
                    { type: 'Text', data: ' - which basically does what I am creating in this post, only better. The dataset creators have a detailed description of their solution, so definitely check it out and star ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'their page' },
                    { type: 'Text', data: '.' }
                ],
            },
            { type: 'span', className: 'body', data: 'To download the dataset yourself, you need a Kaggle account (which is free). With 1.8GB it is fairly manageable. Before getting started, we will need to do some minor preprocessing, to make it work seamlessly with MediaPipe Model Maker.' },

            // First-Third Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'first_third', icon: faBars, data: 'Data preparation' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: "According to the " },
                    { type: 'a', href: '/', className: 'blog_links', data: 'Model Maker documentation' },
                    { type: 'Text', data: " only a small number of training examples is required to retrain/fine tune the models. Approximately 100 examples per class should be sufficient. The easiest way to provide the data to the Model Maker is through a " },
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
                    [{ type: '', code: '' }],
                    [{ type: '', code: '' }],
                    [{ type: 'j', code: '@click.command' }, { type: 'b', code: '()' }],
                    [{ type: 'j', code: '@click.argument' }, { type: 'b', code: '(' }],
                    [{ type: 'c', code: '    "input_root"' }],
                    [{ type: 'f', code: '    type' }, { type: 'b', code: '=click.Path(' }],
                    [{ type: 'f', code: '        exists' }, { type: 'b', code: '=' }, { type: 'a', code: 'True' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '        file_okay' }, { type: 'b', code: '=' }, { type: 'a', code: 'False' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '        path_type' }, { type: 'b', code: '=pathlib.Path' }],
                    [{ type: 'b', code: '    ),' }],
                    [{ type: 'b', code: ')' }],

                    [{ type: 'j', code: '@click.argument' }],
                    [{ type: 'b', code: '(' }],
                    [{ type: 'c', code: '    "output_root"' }],
                    [{ type: 'f', code: '    type' }, { type: 'b', code: '=click.Path(' }],
                    [{ type: 'f', code: '        file_okay' }, { type: 'b', code: '=' }, { type: 'a', code: 'False' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '        path_type' }, { type: 'b', code: '=pathlib.Path' }],
                    [{ type: 'b', code: '    ),' }],
                    [{ type: 'b', code: ')' }],

                    [{ type: 'j', code: '@click.option' }, { type: 'b', code: '(' }],
                    [{ type: 'c', code: '    "--split"' }, { type: 'b', code: ',' }, { type: 'c', code: ' "splits"' }, { type: 'b', code: ',' }, { type: 'f', code: ' multiple' }, { type: 'b', code: '=' }, { type: 'a', code: 'True' }, { type: 'b', code: ', ' }, { type: 'f', code: 'type' }, { type: 'b', code: '=str, ' }, { type: 'f', code: 'default' }, { type: 'b', code: '=[' }, { type: 'c', code: '"train:100' }, { type: 'b', code: ']' }],
                    [{ type: 'b', code: ')' }],
                ]
            },
            { type: 'span', className: 'body', data: 'We use it to obtain two training sets with different sizes as well as a testing set:' },
            {
                type: 'CodeBlock', title: "Bash", extraText: [
                    [{ type: 'a', code: 'python generate_data_samples.py ' }, { type: 'c', code: '\\' }],
                    [{ type: 'a', code: '    ./data/SigNN' }, { type: 'c', code: '\\' }, { type: 'a', code: ' Character' }, { type: 'c', code: '\\' }, { type: 'a', code: ' Database/ ./data/SigNN ' }, { type: 'c', code: '\\' },],
                    [{ type: 'a', code: '    --split ' }, { type: 'c', code: '"train100:100"' }, { type: 'a', code: ' --split ' }, { type: 'c', code: '"train50:50"' }, { type: 'a', code: ' --split' }, { type: 'c', code: '"test:50"' },],
                ]
            },

            // Second Section
            { type: 'span', className: 'section_title sectionIcon', id: 'second', icon: faSection, data: 'Customizing the gesture recognition task' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'With all the requirements installed and the data finalized in the necessary format, we can now tackle the fine tuning process with ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'MediaPipe Model Maker' },
                ],
            },

            // Second-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'second_first', icon: faBars, data: 'Some utility functions' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'We can define a couple of utility functions, which make the code easier to read and avoid duplicated lines. The helper functions are gathered in a local module named ' },
                    { type: 'span', className: 'code', data: 'utils.py' },
                    { type: 'Text', data: ':' }
                ]
            },

            // Second-Second Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'second_second', icon: faBars, data: 'Visualizing the data' },
            { type: 'span', className: 'body', data: 'Before training the model, we can visualize the raw data. With the utility functions from above, this only takes a few lines.' },
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
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image3 },
            { type: 'span', className: 'body', data: 'We can see that some images are fairly low-quality. It will be interesting to see how well the customized model performs.' },

            // Second-Third Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'second_third', icon: faBars, data: 'Ingesting the data' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Following the guide provided in the ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'documentation' },
                    { type: 'Text', data: ' we can create a ' },
                    { type: 'span', className: 'code', data: 'gesture_recognizer.Dataset' },
                    { type: 'Text', data: ' object directly from the dataset folder. First, we set the preprocessing parameters with the ' },
                    { type: 'span', className: 'code', data: 'HandDataPreprocessingParams' },
                    { type: 'Text', data: ' class. This is not strictly necessary, as sensible values are used by default. Then, we call the ' },
                    { type: 'span', className: 'code', data: 'from_folder' },
                    { type: 'Text', data: ' to initialize the dataset. Finally, we can split the dataset into a training and a validation part. The held-out testing data is loaded similarly.' }
                ]
            },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'a', code: 'from' }, { type: 'b', code: ' mediapipe_model_maker.python.vision ' }, { type: 'a', code: 'import' }, { type: 'b', code: ' gesture_recognizer' }],
                    [{ type: '', code: '' }],
                    [{ type: 'b', code: 'handparams = gesture_recognizer.HandDataPreprocessingParams(' }],
                    [{ type: 'f', code: '    min_detection_confidence' }, { type: 'b', code: '=' }, { type: 'h', code: '0.5' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'b', code: 'data = gesture_recognizer.Dataset.from_folder(str(dataset_train), handparams)' }],
                    [{ type: 'b', code: 'train_data, validation_data = data.split(' }, { type: 'f', code: '0.8' }, { type: 'b', code: ')' }],
                    [{ type: 'b', code: 'dataset_test = data_root / ' }, { type: 'c', code: '"SigNN_test"' }],
                    [{ type: 'b', code: 'test_data = gesture_recognizer.Dataset.from_folder(' }],
                    [{ type: 'b', code: '    str(dataset_test), handparams' }],
                    [{ type: 'b', code: ')' }]
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Depending on the size of the dataset, calling ' },
                    { type: 'span', className: 'code', data: 'from_folder' },
                    { type: 'Text', data: ' can take quite some time. This is because some heavy processing is already applied at this point. All images in the dataset folder are read and processed. Here, a default hand landmarker model is applied to find hands in the images. The landmark coordinates are then passed to an embedding module, which produces a meaningful representation of the gesture. We are therefore not fine tuning the model on images directly. Rather, it learns to differentiate the embeddings obtained from each gesture.' }
                ]
            },

            // Second-Fourth Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'second_fourth', icon: faBars, data: 'Fine-tuning the gesture recognizer' },
            { type: 'span', className: 'body', data: 'We can set (and play with) a number of hyper-parameters for the model and the training process.' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'b', code: 'hparams = gesture_recognizer.HParams(' }],
                    [{ type: 'f', code: '    export_dir' }, { type: 'b', code: '=' }, { type: 'c', code: '"exported_model"' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '    batch_size' }, { type: 'b', code: '=' }, { type: 'h', code: '32' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '    epochs' }, { type: 'b', code: '=' }, { type: 'h', code: '30' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '    shuffle' }, { type: 'b', code: '=' }, { type: 'a', code: 'True' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '    learning_rate' }, { type: 'b', code: '=' }, { type: 'h', code: '0.005' }, { type: 'b', code: ',' }],
                    [{ type: 'f', code: '    lr_decay' }, { type: 'b', code: '=' }, { type: 'h', code: '0.999' }, { type: 'b', code: ',' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'b', code: 'moptions = gesture_recognizer.ModelOptions(' }, { type: 'f', code: 'dropout_rate' }, { type: 'b', code: '=' }, { type: 'h', code: '0.05' }, { type: 'b', code: ')' }],
                    [{ type: 'b', code: 'options = gesture_recognizer.GestureRecognizerOptions(' }],
                    [{ type: 'f', code: '    hparams' }, { type: 'b', code: '=hparams, ' }, { type: 'f', code: 'model_options' }, { type: 'b', code: '=moptions' }],
                    [{ type: 'b', code: ')' }],
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'I found that increasing the batch size from 2 (default) helps a lot to improve model performance. For this particular task, we can also get away with a slightly higher learning rate and slower LR decay, compared to the default settings. In the ' },
                    { type: 'span', className: 'code', data: 'ModelOptions' },
                    { type: 'Text', data: ' , we could increase the model size by adding additional layers through the ' },
                    { type: 'span', className: 'code', data: 'layer_widths' },
                    { type: 'Text', data: '  parameter. A bigger model could increase the performance further, I am already quite happy with the results though.' }
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Finally, we train the model by calling the ' },
                    { type: 'span', className: 'code', data: 'create' },
                    { type: 'Text', data: '  function. Even on CPU, this should not take too long, as the model is just a single Dense layer with BatchNorm, ReLU and Dropout - 3737 parameters.' },
                ]
            },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'b', code: 'model = gesture_recognizer.GestureRecognizer.create(' }],
                    [{ type: 'f', code: '    train_data' }, { type: 'b', code: '=train_data, ' }, { type: 'f', code: 'validation_data' }, { type: 'b', code: '=validation_data, ' }, { type: 'f', code: 'options' }, { type: 'b', code: '=options' }],
                    [{ type: 'b', code: ')' }],
                ]
            },
            {
                type: 'Collapsable', colType: 'information', title: 'Repeated calls to `create`', extraText: [
                    { type: 'Text', data: 'Beware that without changing the ' },
                    { type: 'span', className: 'code', data: 'export_dir' },
                    { type: 'Text', data: ' directory, calling ' },
                    { type: 'span', className: 'code', data: 'create' },
                    { type: 'Text', data: ' repeatedly will not retrain from scratch but reuse the existing weights from the last run. When testing out different hyper-parameters, you should rename or delete the output directory.' },
                ]
            },
            { type: 'span', className: 'body', data: 'With around 95% accuracy on the validation set, the model does a good job so far. We can also evaluate the performance on the additional testing data. It appears generalization is also good.' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'b', code: 'loss, acc = model.evaluate(test_data, ' }, { type: 'f', code: 'batch_size' }, { type: 'b', code: '=' }, { type: 'h', code: '32' }, { type: 'b', code: ')' }],
                    [{ type: 'b', code: 'print(' }, { type: 'c', code: 'f"Test loss: ' }, { type: 'a', code: '{' }, { type: 'b', code: 'loss' }, { type: 'a', code: ':' }, { type: 'c', code: '.4f' }, { type: 'a', code: '}' }, { type: 'c', code: 'f"Test loss: ' }, { type: 'a', code: '{' }, { type: 'b', code: 'acc' }, { type: 'a', code: ':' }, { type: 'c', code: '.2%' }, { type: 'a', code: '}' }, { type: 'c', code: '"' }, { type: 'b', code: ')' }],
                    [{ type: 'e', code: '# -> Test loss: 0.1064, Test accuracy: 95.83%' }],
                ]
            },

            // Second-Fifth Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'second_fifth', icon: faBars, data: 'Exporting the customized model' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'We can now export the customized model. With one final line, the fine-tuned ASL alphabet detector is written to disk. It can now be used in any application using MediaPipe through the ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'Gesture Recognition Task' }
                ]
            },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'b', code: 'model.export_model(' }, { type: 'c', code: '"asl_recognizer.task"' }, { type: 'b', code: ')' }],
                ]
            },

            // Second-Sixth Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'second_sixth', icon: faBars, data: 'Applying the customized model' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Similar to the face landmarker described in the ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'previous post' },
                    { type: 'Text', data: ', we can then load and apply the ASL recognizer through the MediaPipe Tasks API. Note that this would not necessarily have to be in Python, but could also be integrated in web or on mobile apps.' }
                ]
            },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' mediapipe ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' mp' }],
                    [{ type: 'a', code: 'from' }, { type: 'b', code: 'mediapipe.tasks.python.vision.gesture_recognizer ' }, { type: 'a', code: 'import' }, { type: 'b', code: ' GestureRecognizer' }],
                    [{ type: '', code: '' }],
                    [{ type: 'b', code: 'base_options = mp.tasks.BaseOptions(' }],
                    [{ type: 'f', code: '    model_asset_path' }, { type: 'b', code: '=hparams.export_dir + ' }, { type: 'c', code: '"/asl_recognizer.task"' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'b', code: 'options = mp.tasks.vision.GestureRecognizerOptions(' }],
                    [{ type: 'f', code: '    base_options' }, { type: 'b', code: '=base_options, ' }, { type: 'f', code: 'running_mode' }, { type: 'b', code: '=mp.tasks.vision.RunningMode.IMAGE' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'a', code: 'with' }, { type: 'b', code: ' GestureRecognizer.create_from_options(options) ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' recognizer:' }],
                    [{ type: 'b', code: '    mp_image = mp.Image.create_from_file(str(filename))' }],
                    [{ type: 'b', code: '    result = recognizer.recognize(mp_image)' }]
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'We can also use the GestureRecognizer task to visualize some test examples. The ' },
                    { type: 'span', className: 'code', data: 'utils.py' },
                    { type: 'Text', data: ' file provides a helper function for this.' }
                ]
            },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'b', code: 'test_samples = np.random.choice(np.asarray(testfiles), ' }, { type: 'h', code: '10' }, { type: 'b', code: ')' }],
                    [{ type: '', code: '' }],
                    [{ type: 'a', code: 'with' }, { type: 'b', code: ' GestureRecognizer.create_from_options(options) ' }, { type: 'a', code: 'as' }, { type: 'b', code: 'recognizer' }],
                    [{ type: 'b', code: '    fig, axarr = utils.plot_recognizer_predictions(test_samples, recognizer, ' }, { type: 'h', code: '5' }, { type: 'b', code: ')' }]
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image4 },

            // Third Section
            { type: 'span', className: 'section_title sectionIcon', id: 'third', icon: faSection, data: 'Detailed performance evaluation' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Using the provided ' },
                    { type: 'span', className: 'code', data: 'model.evaluate' },
                    { type: 'Text', data: ' method, we can see that the model generally performs quite well. Unfortunately, all we get are the global loss and overall accuracy. In a multiclass classification problem, it would however also be interesting to evaluate the accuracy for each class separately.' }
                ],
            },
            { type: 'span', className: 'body', data: 'I have not found a better way to do this more granular analysis through the Model Maker interface. Instead, I am using the exported model through MediaPipe Tasks and build a custom evaluation scheme.' },
            { type: 'span', className: 'body', data: 'To do this, I am iterating through the list of test files, reading the images and running them (one by one) through the recognizer. Without any batching, this is quite an inefficient and comparatively slow solution – but it gets the job done. The original filename, corresponding label and predicted class are stored in a Pandas data frame for further analysis.' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' mediapipe ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' mp' }],
                    [{ type: 'a', code: 'from' }, { type: 'b', code: 'mediapipe.tasks.python.vision.gesture_recognizer ' }, { type: 'a', code: 'import' }, { type: 'b', code: ' GestureRecognizer' }],
                    [{ type: '', code: '' }],
                    [{ type: 'b', code: 'base_options = mp.tasks.BaseOptions(' }],
                    [{ type: 'f', code: '    model_asset_path' }, { type: 'b', code: '=hparams.export_dir + ' }, { type: 'c', code: '"/asl_recognizer.task"' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'b', code: 'options = mp.tasks.vision.GestureRecognizerOptions(' }],
                    [{ type: 'f', code: '    base_options' }, { type: 'b', code: '=base_options, ' }, { type: 'f', code: 'running_mode' }, { type: 'b', code: '=mp.tasks.vision.RunningMode.IMAGE' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'a', code: 'with' }, { type: 'b', code: ' GestureRecognizer.create_from_options(options) ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' recognizer:' }],
                    [{ type: 'b', code: '    mp_image = mp.Image.create_from_file(str(filename))' }],
                    [{ type: 'b', code: '    result = recognizer.recognize(mp_image)' }]
                ]
            },
            { type: 'span', className: 'body', data: 'Sometimes, the model produces an empty string as class output, even though a hand was successfully detected in the image. I am replacing these with “n/a”, for better readability.' },

            // Third-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'third_first', icon: faBars, data: 'Confusion matrix' },
            { type: 'span', className: 'body', data: 'First up, we can look at the confusion matrix. For most characters, performance is very strong, but for some characters, the sensitivity drops down to 70%.' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' mediapipe ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' mp' }],
                    [{ type: 'a', code: 'from' }, { type: 'b', code: 'mediapipe.tasks.python.vision.gesture_recognizer ' }, { type: 'a', code: 'import' }, { type: 'b', code: ' GestureRecognizer' }],
                    [{ type: '', code: '' }],
                    [{ type: 'b', code: 'base_options = mp.tasks.BaseOptions(' }],
                    [{ type: 'f', code: '    model_asset_path' }, { type: 'b', code: '=hparams.export_dir + ' }, { type: 'c', code: '"/asl_recognizer.task"' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'b', code: 'options = mp.tasks.vision.GestureRecognizerOptions(' }],
                    [{ type: 'f', code: '    base_options' }, { type: 'b', code: '=base_options, ' }, { type: 'f', code: 'running_mode' }, { type: 'b', code: '=mp.tasks.vision.RunningMode.IMAGE' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'a', code: 'with' }, { type: 'b', code: ' GestureRecognizer.create_from_options(options) ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' recognizer:' }],
                    [{ type: 'b', code: '    mp_image = mp.Image.create_from_file(str(filename))' }],
                    [{ type: 'b', code: '    result = recognizer.recognize(mp_image)' }]
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image5 },

            // Third-Second Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'third_second', icon: faBars, data: 'Per-class accuracy' },
            { type: 'span', className: 'body', data: 'We can also visiualize the per-class accuracy, while taking into account whether a hand was detected or not. We find that many of the false labels come from empty predictions (~4.4%), which is not too bad compared to actually false characters (~3.1%).' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'a', code: 'import' }, { type: 'b', code: ' mediapipe ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' mp' }],
                    [{ type: 'a', code: 'from' }, { type: 'b', code: ' mediapipe.tasks.python.vision.gesture_recognizer ' }, { type: 'a', code: 'import' }, { type: 'b', code: ' GestureRecognizer' }],
                    [{ type: '', code: '' }],
                    [{ type: 'b', code: 'base_options = mp.tasks.BaseOptions(' }],
                    [{ type: 'f', code: '    model_asset_path' }, { type: 'b', code: '=hparams.export_dir + ' }, { type: 'c', code: '"/asl_recognizer.task"' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'b', code: 'options = mp.tasks.vision.GestureRecognizerOptions(' }],
                    [{ type: 'f', code: '    base_options' }, { type: 'b', code: '=base_options, ' }, { type: 'f', code: 'running_mode' }, { type: 'b', code: '=mp.tasks.vision.RunningMode.IMAGE' }],
                    [{ type: 'b', code: ')' }],
                    [{ type: 'a', code: 'with' }, { type: 'b', code: ' GestureRecognizer.create_from_options(options) ' }, { type: 'a', code: 'as' }, { type: 'b', code: ' recognizer:' }],
                    [{ type: 'b', code: '    mp_image = mp.Image.create_from_file(str(filename))' }],
                    [{ type: 'b', code: '    result = recognizer.recognize(mp_image)' }]
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image6 },
            { type: 'span', className: 'body', data: 'Actually incorrect classifications mostly come from M, N, T, S and E. This makes intuitive sense, since these gestures are very similar with slight variations of the thumb position.' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'b', code: 'results_df.query(' }, { type: 'c', code: "\"result == 'incorrect'\"" }, { type: 'b', code: ').groupby(' }],
                    [{ type: 'c', code: '    "label"' }],
                    [{ type: 'b', code: ').pred.value_counts().sort_values(' }, { type: 'f', code: 'ascending' }, { type: 'b', code: '=' }, { type: 'a', code: 'False' }, { type: 'b', code: ")" }],
                    [{ type: '', code: '' }],
                    [{ type: 'e', code: '# label  pred' }],
                    [{ type: 'e', code: '# M      N       12' }],
                    [{ type: 'e', code: '# T      S        4' }],
                    [{ type: 'e', code: '# N      S        3' }],
                    [{ type: 'e', code: '# E      S        2' }],
                    [{ type: 'e', code: '# R      U        2' }],
                    [{ type: 'e', code: '# C      O        2' }],
                ]
            },

            // Fourth Section
            { type: 'span', className: 'section_title sectionIcon', id: 'fourth', icon: faSection, data: 'Visualizing gesture embeddings' },
            { type: 'span', className: 'body', data: 'Last but not least, I also wanted to take a look at the underlying embeddings. You will see that even without any training, there is already quite a good separation between most classes. To extract the calculated embeddings, we can to access the Tensorflow Data pipline, which is usually handled under the hood:' },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'a', code: 'import ' }, { type: 'b', code: "sklearn.manifold" }],
                    [{ type: '', code: '' }],
                    [{ type: 'b', code: 'tsne = sklearn.manifold.TSNE()' }],
                    [{ type: 'b', code: 'emb = tsne.fit_transform(embeddings)' }]
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'The gesture embeddings have 128 dimensions, which is quite difficult to visualize. I am therefore using t-SNE' },
                    { type: 'Link', to: '#ref_2', className: 'blog_links', data: [{ type: 'sup', id: 'intext_ref_2', data: '[2]' }] },
                    { type: 'Text', data: ' to further reduce the dimensionality:' }
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image7 },
            { type: 'span', className: 'body', data: 'Note that aside from coloring the plot, class labels do not influence any of the processing steps leading to this image. t-SNE is an unsupervised method, which just helps to highlight similarity between the samples. It’s not surprising that our model was able to pick up on these structures as well.' },

            // Conclusion Section
            { type: 'span', className: 'section_title sectionIcon', id: 'conclusion', icon: faSection, data: 'Conclusion' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'This post showcases how ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'MediaPipe Model Maker' },
                    { type: 'Text', data: ' can be used to quickly build a working prototype for a custom problem. All you need is a handful of data and a few lines of code. Although definitely not perfect, the solution presented here performs surprisingly well (>95% accuracy) and can work as an easily achievable baseline for further optimization.' }
                ]
            },
            { type: 'span', className: 'body', data: 'The Model Maker’s ease of use comes at the cost of flexibility. There are only limited options for data handling and model evaluation. We had to prepare the desired amount of data beforehand on disk. After the training process, we had to process test examples one by one to obtain a more granular understanding of the model performance. Hopefully, there will be more flexibility in future releases of the framework.' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'All code for this post is accessible ' },
                    { type: 'a', href: '/', className: 'blog_links', data: 'on GitHub' },
                    { type: 'Text', data: '.' }
                ]
            },
            { type: 'img', className: 'Blog_Image', data: Image8 },

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
                    // { type: 'span', className: 'body footer_left', data: [{ type: "Link", className: 'blog_links_inverse', to: '/blogpage/facial_landmark_detection', icon: faChevronLeft, position: 'left', data: 'Left Link Left Link Left Link Left Link' }] },
                    { type: 'span', className: 'body footer_right', data: [{ type: "Link", className: 'blog_links_inverse', to: `${BlogData[1].article_link}`, icon: faChevronRight, position: 'right', data: `${BlogData[1].article_title}` }] }
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

const wordCount = extractAndCountWords(BlogPage1Data);;
const timeTaken = Math.ceil(wordCount / 200);

BlogPage1Data[0].data[1].data.push(
    { type: 'span', className: 'date sub-body', icon: faCalendarDays, data: `${BlogData[BlogIndex].published_date}` },
    { type: 'span', className: 'words sub-body', icon: faPen, data: `${wordCount} words` },
    { type: 'span', className: 'time sub-body', icon: faClock, data: `${timeTaken} minutes` },
    { type: 'span', className: 'folder sub-body', icon: faFolderOpen, data: [{ type: 'a', className: 'folder blog_links', data: `${BlogData[BlogIndex].folder_name}` }] }
);

export default BlogPage1Data;