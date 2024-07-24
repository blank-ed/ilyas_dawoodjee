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
          <CodeBlock type="shell" title="Shell" extraText={["pip install mediapipe mediapipe-model-maker"]} />

        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default BlogPage1;

