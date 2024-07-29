import TestImage from './test.jpg'

const BlogData = [
    {
        image: TestImage,
        article_title: "Facial landmark detection 1 is still easy with MediaPipe (2023 update)",
        published_date: "03 April 2024",
        published_folder: "/projects",
        folder_name: "Artificial Intelligence",
        article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
        article_link: "/",
        article_tags: [
            { tag_name: "Computer Vision", tag_link: '/projects' },
            { tag_name: "Deep Learning", tag_link: '/about' },
            { tag_name: "Face Detection", tag_link: '/resume' },
            { tag_name: "Python", tag_link: '/blog' }
        ],
    },
    {
        image: TestImage,
        article_title: "Facial landmark detection 2 is still easy with MediaPipe (2023 update)",
        published_date: "03 April 2024",
        published_folder: "/projects",
        folder_name: "Artificial Intelligence",
        article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
        article_link: "/",
        article_tags: [
            { tag_name: "Computer Vision", tag_link: '/projects' },
            { tag_name: "Deep Learning", tag_link: '/about' },
            { tag_name: "Face Detection", tag_link: '/resume' },
            { tag_name: "Python", tag_link: '/blog' }
        ],
    },
    {
        image: TestImage,
        article_title: "Facial landmark detection 3 is still easy with MediaPipe (2023 update)",
        published_date: "03 April 2024",
        published_folder: "/projects",
        folder_name: "Artificial Intelligence",
        article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
        article_link: "/",
        article_tags: [
            { tag_name: "Computer Vision", tag_link: '/projects' },
            { tag_name: "Deep Learning", tag_link: '/about' },
            { tag_name: "Face Detection", tag_link: '/resume' },
            { tag_name: "Python", tag_link: '/blog' }
        ],
    },
    {
        image: TestImage,
        article_title: "Facial landmark detection 4 is still easy with MediaPipe (2023 update)",
        published_date: "03 April 2024",
        published_folder: "/projects",
        folder_name: "Artificial Intelligence",
        article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
        article_link: "/",
        article_tags: [
            { tag_name: "Computer Vision", tag_link: '/projects' },
            { tag_name: "Deep Learning", tag_link: '/about' },
            { tag_name: "Face Detection", tag_link: '/resume' },
            { tag_name: "Python", tag_link: '/blog' }
        ],
    },
    {
        image: TestImage,
        article_title: "Facial landmark detection 5 is still easy with MediaPipe (2023 update)",
        published_date: "03 April 2024",
        published_folder: "/projects",
        folder_name: "Artificial Intelligence",
        article_abstract: "In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it. In 2023, MediaPipe has seen a major overhaul and now provides various new features in addition to a more versatile API. While code from my older post still works (as of writing - November 2023, mediapipe==0.10.7), I want to briefly take a look at the new API and recreate the rotating face using it.",
        article_link: "/",
        article_tags: [
            { tag_name: "Computer Vision", tag_link: '/projects' },
            { tag_name: "Deep Learning", tag_link: '/about' },
            { tag_name: "Face Detection", tag_link: '/resume' },
            { tag_name: "Python", tag_link: '/blog' }
        ],
    },
]

// BlogData.forEach(article => {
//     const words = article.article_title.split(' ');
//     article.article_link = '/blogpage/' + `${words[0]}_${words[1]}_${words[2]}${words[3]}`.toLowerCase();
// });

BlogData.forEach(article => {
    const formattedTitle = article.article_title
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');
    article.article_link = `/blogpage/${formattedTitle}`;
});

export default BlogData;