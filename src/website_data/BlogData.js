import PlaceHolderImage from './placeholderimage.jpg'
import Figure1 from './BlogPage1Data/images/Figure1.png'

const BlogData = [
    {
        BlogIndex: '',
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
    {
        BlogIndex: '',
        image: Figure1,
        article_title: "Understanding PointNet++: A Intuitive & Visual Guide",
        published_date: "21 March 2025",
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
]

BlogData.forEach(article => {
    const words = article.article_title.split(' ')
        .map(word => word.replace(/:/g, '')) // remove colons
        .filter(word => /^[A-Za-z]+$/.test(word)); // filter only words with letters A-Z or a-z
    article.article_link = '/blogpage/' + words.slice(0, 4).join('_').toLowerCase(); // use first 4 valid words
});

for (const [index, element] of BlogData.entries()) {
    element.BlogIndex = index;
}

export default BlogData;