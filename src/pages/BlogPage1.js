import React, { useEffect, useRef, useState } from 'react';
import './BlogPage.css'

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Collapsable from '../components/Collapsable';
import CodeBlock from '../components/CodeBlock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faPen, faClock, faSection, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TestImage from '../components/website_data/test.jpg'
import { type } from '@testing-library/user-event/dist/type';

function BlogPage1() {
  const pageRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (pageRef.current) {
      const text = pageRef.current.innerText;
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      setWordCount(wordCount);
    }
  }, []);

  const timeTaken = Math.ceil(wordCount / 200);

  return (
    <div className='BlogPage Page' ref={pageRef}>
      <NavBar selected='blog'></NavBar>
      <div className="BlogPage_Container">

        <div className="BlogPage_TitleSection">
          <span className="mainTitle">Customizing a gesture recognition model with MediaPipe</span>
          <div className="BlogPage_SubTitleSection">
            <span className="date sub-body"><FontAwesomeIcon icon={faCalendarDays} />&nbsp;&nbsp;23 July 2024</span>
            <span className="words sub-body"><FontAwesomeIcon icon={faPen} />&nbsp;&nbsp;{wordCount} words</span>
            <span className="time sub-body"><FontAwesomeIcon icon={faClock} />&nbsp;&nbsp;{timeTaken} minutes</span>
            <span className="folder sub-body"><Link to='/' className='blog_links'><FontAwesomeIcon icon={faFolderOpen} />&nbsp;&nbsp;Folder Name</Link></span>
          </div>
          <img className='Blog_Image' src={TestImage} alt="" />
          <span className="body">MediaPipe<a className='blog_links' href="/" target='_blank'><sup>[1]</sup></a> is an amazing library of ready-to-use deep learning models for common tasks in various domains. <a href="https://www.samproell.io/posts/ai/mediapipe-update-2023/" target='_blank' className='blog_links'>My previous post</a> highlights how you can use it to easily detect facial landmarks. There are many <a href="https://ai.google.dev/edge/mediapipe/solutions/guide#available_solutions" target='_blank' className='blog_links'>other solutions</a> available to explore. In this post however, I want to take a look at another feature, the <a className='blog_links' href="">MediaPipe Model Maker</a>. Model maker allows you to extend the functionality of some MediaPipe solutions by customizing models to your specific use case. With only a few lines of code, you can fine tune models and rewire the internals to accommodate new targets.</span>
          <span className="body">In this particular example, we will customize the hand gesture recognition task to build a model for reading the <a href="https://en.wikipedia.org/wiki/American_manual_alphabet" target='_blank' className='blog_links'>American Sign Language (ASL)</a> fingerspelling alphabet. We are going to learn how a basic solution can be created with small effort. But we will also see that there are limitations to the (current) functionality of the MediaPipe Model Maker.</span>
          <img className='Blog_Image' src={TestImage} alt="" />
          <Collapsable type="warning" title="Click to Expand" extraText="Here is some more detailed information that you can see when the component is expanded." />
          <Collapsable type="information" title="Click to Expand" extraText="Here is some more detailed information that you can see when the component is expanded." />
        </div>

        <div className="BlogPage_ContentSection">
          {/* Summary Section */}
          <span className="section_title"><a className='sectionIcon' href="#summary"><FontAwesomeIcon icon={faSection} /></a>  Summary</span>
          <span className="body">Here is a quick overview of the required steps to customize the gesture recognition task for a new problem. The approach is the same for the more general image classification task.</span>
          <ul>
            <li><strong>Get or create some data.</strong> Image files for each class must be provided in a separate sub folder. The folder names are used as class labels.</li>
            <li><strong>Preprocess images</strong> by calling <span className="code">Dataset.from_folder</span></li>
            <li><strong>Set hyper-parameters</strong> with <span className="code">HParams</span> and <span className="code">ModelOptions</span></li>
            <li><strong>Fine tune the model</strong> with <span className="code">GestureRecognizer.create</span></li>
            <li><strong>Evaluate performance</strong> with <span className="code">model.evaluate</span></li>
            <li><strong>Export the model</strong> with <span className="code">model.export_model</span></li>
          </ul>
          <span className="body">Beyond the basic steps, we are going to take a look at the hand gesture embeddings, which MediaPipe uses under the hood and we will also perform a more thorough evaluation of the model’s accuracy.</span>

          {/* First Section */}
          <span className="section_title"><a className='sectionIcon' href="#first"><FontAwesomeIcon icon={faSection} /></a>  Prerequisites</span>
          <span className="body">Before getting started with the main code, we need take care of some external resources. First, the Model Maker does not come with the default MediaPipe installation, so we need to install it separately. Next, we also need to get some data to train the ASL alphabet detector. MediaPipe will work directly from the files on disk, so some minor preprocessing on the dataset is also needed.</span>

          <span className="subSection_title"><a className='sectionIcon subSection' href="#first_first"><FontAwesomeIcon icon={faBars} /></a>  Installing MediaPipe Model Maker</span>
          <span className="body">Installing is straightforward with pip. Note that the installation might not succeed on Windows. If you are on Windows, you can use the Windows Subsystem for Linux (WSL) instead.</span>
          <CodeBlock title="Shell" extraText={[
            [{ type: 'shell', code: "pip install mediapipe mediapipe-model-maker" }]
          ]} />

          <span className="subSection_title"><a className='sectionIcon subSection' href="#first_second"><FontAwesomeIcon icon={faBars} /></a>  Getting the data</span>
          <span className="body">For this example, I am going to use the SigNN Character Database from Kaggle. It contains 8442 images showing 24 characters of the english alphabet. The dataset excludes J and Z, because they are differentiated from other characters through motion (see the image below the post). The dataset was originally created to build a mobile ASL alphabet translator - which basically does what I am creating in this post, only better. The dataset creators have a detailed description of their solution, so definitely check it out and star their page.</span>
          <span className="body">To download the dataset yourself, you need a Kaggle account (which is free). With 1.8GB it is fairly manageable. Before getting started, we will need to do some minor preprocessing, to make it work seamlessly with MediaPipe Model Maker.</span>

          <span className="subSection_title"><a className='sectionIcon subSection' href="#first_third"><FontAwesomeIcon icon={faBars} /></a>  Data preparation</span>
          <span className="body">According to the Model Maker documentation, only a small number of training examples is required to retrain/fine tune the models. Approximately 100 examples per class should be sufficient. The easiest way to provide the data to the Model Maker is through a <span className="code">from_folder</span> method. It scans the given folder, interprets any subdirectory as target classes and any containing (image) files as instances of that class. The SigNN dataset is already provided in this format.</span>
          <span className="body">In addition, MediaPipe requires a <span className="code">"none"</span> class for training, which should include examples that do not show any of the target labels. Training will not run without it. We can create an empty folder called <span className="code">"none"</span> within the training directory. This will allow us to run the training, although it would probably be better to provide actual negative examples.</span>
          <span className="body">We could start training with this dataset immediately. But data processing with the Model Maker is quite slow, so I do not want to work with the full dataset. Unfortunately, the MediaPipe interface has no straightforward way to control how much data is used. The easiest way I have found is to simply copy a the desired number of samples to a separate folder on disk. The following script, allows us to extract multiple non-overlapping subsets, including a heldout test set from the original dataset.</span>
          <CodeBlock title="Python" extraText={[
            [{ type: 'docstring', code: '"""Extract a sample from the ASL Alphabet dataset."""' }],
            [{ type: '', code: '' }],
            [{ type: 'import-keyword', code: 'import' }, { type: 'import', code: ' pathlib' }],
            [{ type: 'import-keyword', code: 'import' }, { type: 'import', code: ' shutil' }],
            [{ type: 'import-keyword', code: 'import' }, { type: 'import', code: ' typing' }],
            [{ type: '', code: '' }],
            [{ type: 'import-keyword', code: 'import' }, { type: 'import', code: ' click' }],
            [{ type: 'import-keyword', code: 'import' }, { type: 'import', code: ' numpy' }, { type: 'import-keyword', code: ' as' }, { type: ' import', code: ' np' }],
            [{ type: 'import-keyword', code: 'import' }, { type: 'import', code: ' tqdm' }],
            [{ type: '', code: '' }],
            [{ type: '', code: '' }],
            [{ type: 'keyword', code: 'def' }, { type: 'function-name', code: ' process_split_sizes' }, { type: 'variable', code: '(splits: typing)' }],
          ]} />

        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default BlogPage1;

