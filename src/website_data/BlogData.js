import PlaceHolderImage from './placeholderimage.jpg'
import Figure1 from './BlogPage1Data/images/Figure1.png'

const BlogData = [
    {
        image: Figure1,
        article_title: "Understanding PointNet++: A Intuitive & Visual Guide",
        published_date: "01 April 2025",
        folder_name: "Artificial Intelligence",
        article_abstract: "I recently came across a paper, PointNet++ [1] , that trains a deep learning model from Point Cloud Data (PCD) to classify and segment 3D geometric data. The model bypasses the need to preprocess the data into image grids or 3D voxels, which can result in a loss of detail and added complexity. As someone new to this field, I found this paper challenging. Aside from the paper and a few vague blog posts, there wasn’t many resources to learn from. Either way, the explanations in various sections were either filled with unnecessarily complex language or simply reiterated content from the original paper, which did not help much. This has led me document my understanding of this paper in terms of a blog post, where I will try to provide examples with visuals for a better understanding. This blog is about providing readers, from beginners to experts, an intuitive and visual way of understanding PointNet++ by comparing different algorithms and explaining the rationale behind selecting specific approaches.",
        article_link: "/",
        article_tags: [
            { tag_name: "Deep Learning" },
            { tag_name: "Point Clouds" },
            { tag_name: "Computer Vision" },
            { tag_name: "3D Data Processing" },
        ],
    },
    {
        image: PlaceHolderImage,
        article_title: "Training custom PointNet++ Classification Model Using Machining Feature Dataset",
        published_date: "xx xxxx 2025",
        folder_name: "Artificial Intelligence",
        article_abstract: "...",
        article_link: "/",
        article_tags: [
            { tag_name: "Deep Learning" },
            { tag_name: "Point Clouds" },
            { tag_name: "Computer Vision" },
            { tag_name: "3D Data Processing" },
        ],
    },
    // {
    //     image: BlogPage1Image,
    //     article_title: "Customizing a gesture recognition model with MediaPipe",
    //     published_date: "07 April 2024",
    //     published_folder: "/projects",
    //     folder_name: "Artificial Intelligence",
    //     article_abstract: "MediaPipe is an amazing library of ready-to-use deep learning models for common tasks in various domains. My previous post highlights how you can use it to easily detect facial landmarks. There are many other solutions available to explore. In this post however, I want to take a look at another feature, the MediaPipe Model Maker. Model maker allows you to extend the functionality of some MediaPipe solutions by customizing models to your specific use case. With only a few lines of code, you can fine tune models and rewire the internals to accommodate new targets.",
    //     article_link: "/",
    //     article_tags: [
    //         { tag_name: "Computer Vision", tag_link: '/projects' },
    //         { tag_name: "Deep Learning", tag_link: '/projects' },
    //         { tag_name: "Gesture Recognition", tag_link: '/projects' },
    //         { tag_name: "Python", tag_link: '/projects' },
    //         { tag_name: "Transfer Learning", tag_link: '/projects' }
    //     ],
    // },
    // {
    //     image: TestImage,
    //     article_title: "Facial landmark detection 2 is still easy with MediaPipe (2023 update)",
    //     published_date: "03 April 2024",
    //     published_folder: "/projects",
    //     folder_name: "Artificial Intelligence",
    //     article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
    //     article_link: "/",
    //     article_tags: [
    //         { tag_name: "Computer Vision", tag_link: '/projects' },
    //         { tag_name: "Deep Learning", tag_link: '/projects' },
    //         { tag_name: "Face Detection", tag_link: '/projects' },
    //         { tag_name: "Python", tag_link: '/projects' }
    //     ],
    // },
    // {
    //     image: TestImage,
    //     article_title: "Facial landmark detection 3 is still easy with MediaPipe (2023 update)",
    //     published_date: "03 February 2023",
    //     published_folder: "/projects",
    //     folder_name: "Remote PPG",
    //     article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
    //     article_link: "/",
    //     article_tags: [
    //         { tag_name: "Computer Vision", tag_link: '/projects' },
    //         { tag_name: "Machine Learning", tag_link: '/projects' },
    //         { tag_name: "Face Detection", tag_link: '/projects' },
    //         { tag_name: "Python", tag_link: '/projects' }
    //     ],
    // },
    // {
    //     image: TestImage,
    //     article_title: "Facial landmark detection 4 is still easy with MediaPipe (2023 update)",
    //     published_date: "03 January 2022",
    //     published_folder: "/projects",
    //     folder_name: "Remote PPG",
    //     article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
    //     article_link: "/",
    //     article_tags: [
    //         { tag_name: "Robotics", tag_link: '/projects' },
    //         { tag_name: "Machine Learning", tag_link: '/projects' },
    //         { tag_name: "Face Detection", tag_link: '/projects' },
    //         { tag_name: "Python", tag_link: '/projects' }
    //     ],
    // },
    // {
    //     image: TestImage,
    //     article_title: "Facial landmark detection 5 is still easy with MediaPipe (2023 update)",
    //     published_date: "02 January 2022",
    //     published_folder: "/projects",
    //     folder_name: "Signal Processing",
    //     article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
    //     article_link: "/",
    //     article_tags: [
    //         { tag_name: "Robotics", tag_link: '/projects' },
    //         { tag_name: "Artificial Intelligence", tag_link: '/projects' },
    //         { tag_name: "Face Detection", tag_link: '/projects' },
    //         { tag_name: "Python", tag_link: '/projects' }
    //     ],
    // },
]

BlogData.forEach(article => {
    const words = article.article_title.split(' ');
    article.article_link = '/blogpage/' + `${words[0]}_${words[1]}_${words[2]}${words[3]}`.toLowerCase();
});

export default BlogData;