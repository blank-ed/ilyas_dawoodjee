import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Edges, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";
import { faBars, faSection } from '@fortawesome/free-solid-svg-icons';

// Importing blog data overview and necessary components
import { footer_content, blogpage_subtitle_content, blogpage_title_content, blogpage_references_content } from '../GeneralBlogPageData';

// Importing STL files
import Oring from './cad_models/0_Oring.STL'
import ThroughHole from './cad_models/1_ThroughHole.STL'
import BlindHole from './cad_models/2_BlindHole.STL'
import TriangularPassage from './cad_models/3_TriangularPassage.STL'
import RectangularPassage from './cad_models/4_RectangularPassage.STL'
import CircularThroughSlot from './cad_models/5_CircularThroughSlot.STL'
import TriangularThroughSlot from './cad_models/6_TriangularThroughSlot.STL'
import RectangularThroughSlot from './cad_models/7_RectangularThroughSlot.STL'
import RectangularBlindSlot from './cad_models/8_RectangularBlindSlot.STL'
import TriangularPocket from './cad_models/9_TriangularPocket.STL'
import RectangularPocket from './cad_models/10_RectangularPocket.STL'
import CircularEndPocket from './cad_models/11_CircularEndPocket.STL'
import TriangularBlindStep from './cad_models/12_TriangularBlindStep.STL'
import CircularBlindStep from './cad_models/13_CircularBlindStep.STL'
import RectangularBlindStep from './cad_models/14_RectangularBlindStep.STL'
import RectangularThroughStep from './cad_models/15_RectangularThroughStep.STL'
import TwoSidesThroughStep from './cad_models/16_TwoSidesThroughStep.STL'
import SlantedThroughStep from './cad_models/17_SlantedThroughStep.STL'
import Chamfer from './cad_models/18_Chamfer.STL'
import Round from './cad_models/19_Round.STL'
import VCircularEndBlindSlot from './cad_models/20_VCircularEndBlindSlot.STL'
import HCircularEndBlindSlot from './cad_models/21_HCircularEndBlindSlot.STL'
import SixSidesPassage from './cad_models/22_SixSidesPassage.STL'
import SixSidesPocket from './cad_models/23_SixSidesPocket.STL'

// Import figures
import Figure1 from './images/Figure1.png'
import Figure2 from './images/Figure2.png'
import Figure3 from './images/Figure3.png'
import Figure4 from './images/Figure4.png'
import Figure5 from './images/Figure5.png'
import Figure6 from './images/Figure6.png'

function CADModelSection() {
    const modelButtons = [
        { label: 'O-Ring', url: Oring },
        { label: 'Through Hole', url: ThroughHole },
        { label: 'Blind Hole', url: BlindHole },
        { label: 'Triangular Passage', url: TriangularPassage },
        { label: 'Rectangular Passage', url: RectangularPassage },
        { label: 'Circular Through Slot', url: CircularThroughSlot },
        { label: 'Triangular Through Slot', url: TriangularThroughSlot },
        { label: 'Rectangular Through Slot', url: RectangularThroughSlot },
        { label: 'Rectangular Blind Slot', url: RectangularBlindSlot },
        { label: 'Triangular Pocket', url: TriangularPocket },
        { label: 'Rectangular Pocket', url: RectangularPocket },
        { label: 'Circular End Pocket', url: CircularEndPocket },
        { label: 'Triangular Blind Step', url: TriangularBlindStep },
        { label: 'Circular Blind Step', url: CircularBlindStep },
        { label: 'Rectangular Blind Step', url: RectangularBlindStep },
        { label: 'Rectangular Through Step', url: RectangularThroughStep },
        { label: '2-Sides Through Step', url: TwoSidesThroughStep },
        { label: 'Slanted Through Step', url: SlantedThroughStep },
        { label: 'Chamfer', url: Chamfer },
        { label: 'Round', url: Round },
        { label: 'Vertical Circular End Blind Slot', url: VCircularEndBlindSlot },
        { label: 'Horizontal Circular End Blind Slot', url: HCircularEndBlindSlot },
        { label: '6-Sides Passage', url: SixSidesPassage },
        { label: '6-Sides Pocket', url: SixSidesPocket },
    ];

    const [modelUrl, setModelUrl] = useState(Oring);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [totalPoints, setTotalPoints] = useState(10000);
    const [cadType, setCadType] = useState("Solid");

    const controlsRef = useRef(); // Ref for OrbitControls

    const handleReset = () => {
        setModelUrl(Oring); // Reset model URL
        setSelectedButtonIndex(0); // Reset selected button
        setTotalPoints(10000); // Reset points
        setCadType("Solid"); // Reset to Solid model
        if (controlsRef.current) {
            controlsRef.current.reset(); // Reset the OrbitControls
        }
    };

    function SolidModel({ url }) {
        const geometry = useLoader(STLLoader, url);

        // Center the geometry and compute bounding sphere
        geometry.center(); // Ensure the SolidModel's geometry is centered like the PointCloudModel
        geometry.computeBoundingSphere(); // Optional for future bounding sphere-related operations

        const key = React.useMemo(() => url, [url]);

        return (
            <mesh key={key}>
                <primitive object={geometry} attach="geometry" />
                <meshPhongMaterial color="gray" />
                <Edges key={`${key}-edges`} color="black" />
            </mesh>
        );
    }

    function PointCloudModel({ url, totalPoints }) {
        const geometry = useLoader(STLLoader, url);

        // Center the geometry and compute bounding sphere
        geometry.center();
        geometry.computeBoundingSphere();

        // Function to calculate the area of a triangle
        function triangleArea(a, b, c) {
            const ab = new Vector3().subVectors(b, a);
            const ac = new Vector3().subVectors(c, a);
            return 0.5 * ab.cross(ac).length();
        }

        // Function to interpolate random points on a triangle's surface
        function randomPointInTriangle(a, b, c) {
            const r1 = Math.random();
            const r2 = Math.random();
            const sqrtR1 = Math.sqrt(r1);

            const point = new Vector3()
                .copy(a)
                .multiplyScalar(1 - sqrtR1)
                .add(new Vector3().copy(b).multiplyScalar(sqrtR1 * (1 - r2)))
                .add(new Vector3().copy(c).multiplyScalar(sqrtR1 * r2));

            return point;
        }

        // Step 1: Calculate the area of each triangle and the total area
        const vertices = geometry.attributes.position.array;
        const areas = [];
        let totalArea = 0;

        for (let i = 0; i < vertices.length; i += 9) {
            const a = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
            const b = new Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
            const c = new Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

            const area = triangleArea(a, b, c);
            areas.push(area);
            totalArea += area;
        }

        // Step 2: Allocate points to triangles proportionally to their area
        const points = [];
        const pointsPerTriangle = areas.map(
            (area) => Math.floor((area / totalArea) * totalPoints)
        );

        // Step 3: Adjust for rounding errors to ensure exact totalPoints
        let allocatedPoints = pointsPerTriangle.reduce((sum, num) => sum + num, 0);
        let remainingPoints = totalPoints - allocatedPoints;

        // Add the remaining points to triangles with the largest areas
        while (remainingPoints > 0) {
            const maxAreaIndex = areas.indexOf(Math.max(...areas));
            pointsPerTriangle[maxAreaIndex]++;
            remainingPoints--;
        }

        // Step 4: Generate points for each triangle
        for (let i = 0; i < vertices.length; i += 9) {
            const a = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
            const b = new Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
            const c = new Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

            const numPoints = pointsPerTriangle[i / 9];
            for (let j = 0; j < numPoints; j++) {
                const point = randomPointInTriangle(a, b, c);
                points.push(point.x, point.y, point.z);
            }
        }

        // Step 5: Create a BufferGeometry for the point cloud
        const pointGeometry = new BufferGeometry();
        pointGeometry.setAttribute(
            "position",
            new Float32BufferAttribute(points, 3)
        );

        return (
            <points geometry={pointGeometry}>
                <pointsMaterial color="#ffffff" size={0.1} sizeAttenuation={true} />
            </points>
        );
    }

    return (
        <>
            <div className="CADModelDisplay">
                <div className="CADModelType">
                    <button onClick={() => setCadType("Solid")} className={cadType === "Solid" ? "selected" : ""}>
                        Solid Model
                    </button>
                    <button onClick={() => setCadType("PointCloud")} className={cadType === "PointCloud" ? "selected" : ""}>
                        Point Cloud Model
                    </button>
                </div>
                <div className="CADModel">
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <Suspense fallback={<Html><span>Loading...</span></Html>}>
                            <group rotation={[Math.PI / 4, Math.PI / 4, 0]} position={[0, 3, 0]}>
                                {cadType === "Solid" ? (
                                    <SolidModel url={modelUrl} />
                                ) : (
                                    <PointCloudModel url={modelUrl} totalPoints={totalPoints} />
                                )}
                            </group>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 10]} intensity={5} />
                            <OrbitControls
                                ref={controlsRef}
                                target={[0, 0, 0]}
                                maxDistance={80}
                                minDistance={40}
                            />
                        </Suspense>
                    </Canvas>
                    <button className="reset-button" onClick={handleReset}>
                        Reset
                    </button>
                </div>
                {cadType === "PointCloud" && (
                    <div className="PointCloudSlider">
                        <label>
                            Number of Points: {totalPoints}&nbsp;&nbsp;
                            <input
                                type="range"
                                min="100"
                                max="100000"
                                step="100"
                                value={totalPoints}
                                onChange={(e) => setTotalPoints(Number(e.target.value))}
                            />
                        </label>
                    </div>
                )}
            </div>
            <div className="CADModelSelector">
                {modelButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setModelUrl(button.url);
                            setSelectedButtonIndex(index);
                        }}
                        className={selectedButtonIndex === index ? "selected" : ""}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </>
    );
}

const BlogIndex = 0;

// For Table of Contents
const tocItems = [
    ['Revisiting PointNet'],  // First section
    ['Hierarchical Point Set Feature Learning', 'Sampling Layer', 'Grouping Layer', 'PointNet Layer'],  // Second section
    ['Robust Feature Learning Under Non-Uniform Sampling Density', 'Multi-Scale Grouping (MSG)', 'Multi-Resolution Grouping (MRG)', 'Single-Scale Grouping (SSG)', 'Random Input Dropout (DP)', 'Network Architectures'],  // Third section
    ['Performance Evaluation of PointNet++ Variants Under Non-Uniform Sampling'],  // Fourth section
    ['PCD Visualizers', 'FPS vs Random Sampling Visualizer', 'Ball Query vs kNN Visualizer'],  // Fifth Section
    ['Future Directions'],  // Sixth Section
];

const titleContent = blogpage_title_content({ BlogIndex: BlogIndex, tocItems: tocItems });
const indexToRemove = 17;

// Create a new contentText array for the specific section (at index 3)
const newContentText = [
    ...titleContent.data[3].contentText.slice(0, indexToRemove),
    ...titleContent.data[3].contentText.slice(indexToRemove + 1)
];

// Update only the section that contains contentText, keeping the rest intact
const newData = titleContent.data.map((section, idx) => {
    if (idx === 3) {
        return {
            ...section,
            contentText: newContentText
        };
    }
    return section;
});

const newTitleContent = {
    ...titleContent,
    data: newData
};

const sectionLinks = [...titleContent.sectionLinks];
const tocTitles = [...titleContent.tocTitles];

// For References
const ReferencesItems = [
    {
        citationText: "Qi, C.R., Yi, L., Su, H. and Guibas, L.J., 2017. Pointnet++: Deep hierarchical feature learning on point sets in a metric space. Advances in neural information processing systems, 30",
        href: "https://arxiv.org/abs/1706.02413",
    },
    {
        citationText: "Qi, C.R., Su, H., Mo, K. and Guibas, L.J., 2017. Pointnet: Deep learning on point sets for 3d classification and segmentation. In Proceedings of the IEEE conference on computer vision and pattern recognition (pp. 652-660)",
        href: "https://arxiv.org/abs/1612.00593",
    },
    {
        citationText: "Eldar, Y., Lindenbaum, M., Porat, M., and Zeevi, Y. Y. (1997). The farthest point strategy for progressive image sampling. IEEE Transactions on Image Processing, 6(9):1305-1315",
        href: "https://ieeexplore.ieee.org/document/623193",
    },
    {
        citationText: "Hao, C.R.Q.L.Y. and Guibas, S.L.J., PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space Supplementary Material",
        href: "https://proceedings.neurips.cc/paper_files/paper/2017/file/d8bf84be3800d12f74d8b05e9b89836f-Supplemental.zip",
    },
    {
        citationText: "Zhang, Z., Jaiswal, P. and Rai, R., 2018. Featurenet: Machining feature recognition based on 3d convolution neural network. Computer-Aided Design, 101, pp.12-22",
        href: "https://www.sciencedirect.com/science/article/abs/pii/S0010448518301349?via%3Dihub",
    },
];

const referencesContent = blogpage_references_content({ ReferencesItems: ReferencesItems });

const BlogPage1Data = [
    // Title Section
    newTitleContent,

    // Content Section
    {
        type: 'div', className: 'BlogPage_ContentSection', data: [
            // Summary Section
            { type: 'span', className: 'section_title sectionIcon', id: 'summary', icon: faSection, data: 'Summary' },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'I recently came across a paper, PointNet++ ' },
                    { type: 'Link', to: '#ref_1', className: 'blog_links', data: [{ type: 'Text', data: '[1]' }] },
                    { type: 'Text', data: ', that trains a deep learning model from Point Cloud Data (PCD) to classify or to segment 3D geometric data. The model bypasses the need to preprocess the data into image grids or 3D voxels, which can result in a loss of detail and added complexity. As someone new to this field, I found this paper challenging. Aside from the paper and a few vague blog posts, there wasn’t many resources to learn from. Either way, the explanations in various sections were either filled with unnecessarily complex language or simply reiterated content from the original paper, which did not help much. This has led me document my understanding of this paper in terms of a blog post, where I will try to provide examples and visuals for a better understanding. This blog is about providing readers, from beginners to experts, an intuitive and visual way of understanding PointNet++ by comparing different algorithms and explaining the rationale behind selecting specific approaches.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'PointNet++ ' },
                    { type: 'Link', to: '#ref_1', className: 'blog_links', data: [{ type: 'Text', data: '[1]' }] },
                    { type: 'Text', data: ' can be seen as an extension of PointNet ' },
                    { type: 'Link', to: '#ref_2', className: 'blog_links', data: [{ type: 'Text', data: '[2]' }] },
                    { type: 'Text', data: ', but with an added hierarchical structure. The drawback pointed out for PointNet is that it does not capture local features effectively, rather processes global features unlike that of convolutional architectures that capture local patterns through kernels. Capturing local features means that for each point, we look at its neighbouring points and determine the relationship through hierarchical layers that process local regions at increasing scales. This approach allows us to better generalize to unseen shapes. Looking at global features misses out on the fine-grained details of the Point Cloud Data (PCD). ' },
                    { type: 'Link', to: "#fig_1", className: 'blog_links', data: "Figure 1" },
                    { type: 'Text', data: ' shows PointNet++ architecture diagram. Let us first look at a basic explanation of PointNet. In the following sections, we will explore an extension of PointNet with a hierarchical structure and finally discuss PointNet++.' },
                ]
            },
            { type: 'img', id: 'fig_1', className: 'Blog_Image', data: [Figure1, 'Figure 1: PointNet++ Architecture Diagram', '', { type: 'Link', to: '#ref_1', className: 'blog_links', data: [{ type: 'Text', data: '[1]' }] }] },

            // First Section
            { type: 'span', className: 'section_title sectionIcon', id: sectionLinks.shift(), icon: faSection, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'In PointNet ' },
                    { type: 'Link', to: '#ref_2', className: 'blog_links', data: [{ type: 'Text', data: '[2]' }] },
                    { type: 'Text', data: ', we start with an unordered set of points ' },
                    { type: 'Equation', data: '\\chi = \\{x_1, x_2, \\ldots, x_n\\}' },
                    { type: 'Text', data: ' where ' },
                    { type: 'Equation', data: 'x_i \\in \\mathbb{R}^d' },
                    { type: 'Text', data: '. The network defines a permutation-invariant set function that maps these points to a vector. The function is structured as follows: ' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'f(x_1, x_2, \\ldots, x_n) = \\gamma \\left( \\max\\limits_{i=1,\\ldots,n} \\{ h(x_i) \\} \\right)' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Here ' },
                    { type: 'Equation', data: '\\gamma' },
                    { type: 'Text', data: ' and ' },
                    { type: 'Equation', data: 'h' },
                    { type: 'Text', data: ' are Multi-Layer Perceptrons (MLPs). The key steps are:' },
                ]
            },
            {
                type: 'ul', data: [
                    { type: 'li', data: [{ type: 'Text', data: 'Each point ' }, { type: 'Equation', data: 'x_i' }, { type: 'Text', data: ' is processed independently by the shared MLP ' }, { type: 'Equation', data: 'h' }, { type: 'Text', data: ', producing a feature vector for that point.' },] },
                    { type: 'li', data: [{ type: 'Text', data: 'An element-wise max-pooling operation is applied across all ' }, { type: 'Equation', data: 'h(x_i)' }, { type: 'Text', data: ', collapsing the set into a single global feature vector that is invariant to the order of points.' },] },
                    { type: 'li', data: [{ type: 'Text', data: 'This global feature vector is then passed through another MLP ' }, { type: 'Equation', data: '\\gamma' }, { type: 'Text', data: ' to generate the final output (e.g., classification scores or segmentation features).' },] },
                ]
            },

            // Second Section
            { type: 'span', className: 'section_title sectionIcon', id: sectionLinks.shift(), icon: faSection, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'As mentioned earlier, in PointNet ' },
                    { type: 'Link', to: '#ref_2', className: 'blog_links', data: [{ type: 'Text', data: '[2]' }] },
                    { type: 'Text', data: ', a single max pooling operation is used to aggregate the whole point set, which means that instead of looking at each point individually, the network combines all the points into one summary that represents the entire shape or object. PointNet++ ' },
                    { type: 'Link', to: '#ref_1', className: 'blog_links', data: [{ type: 'Text', data: '[1]' }] },
                    { type: 'Text', data: ' improves on this by grouping points in layers, starting with small neighbourhoods of points and gradually zooming out to capture broader patterns. Because PointNet’s single summary loses fine details, PointNet++ adds layers that analyze points at different scales which is like zooming in on local details first, then stepping back to see the bigger picture.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'This hierarchical structure consists of multiple Set Abstraction (SA) levels. In a single SA level, the point set is processed and abstracted, which outputs a new point set with fewer elements. There are three layers that goes into this (see ' },
                    { type: 'Link', to: "#fig_1", className: 'blog_links', data: "Figure 1" },
                    { type: 'Text', data: '): ' },
                    { type: 'em', data: 'Sampling Layer' },
                    { type: 'Text', data: ', ' },
                    { type: 'em', data: 'Grouping Layer' },
                    { type: 'Text', data: ', and ' },
                    { type: 'em', data: 'PointNet Layer' },
                    { type: 'Text', data: '. Each SA level takes an input matrix of ' },
                    { type: 'Equation', data: 'N \\times (d + C)' },
                    { type: 'Text', data: ', where ' },
                    { type: 'Equation', data: 'N' },
                    { type: 'Text', data: ' is the number of points, ' },
                    { type: 'Equation', data: 'd' },
                    { type: 'Text', data: ' is the number of dimensions, and ' },
                    { type: 'Equation', data: 'C' },
                    { type: 'Text', data: '-dim point feature. A simple example of this would be, let’s say we have a point cloud of 1024 points ' },
                    { type: 'Equation', data: '(N = 1024)' },
                    { type: 'Text', data: ', with ' },
                    { type: 'Equation', data: 'd = 3' },
                    { type: 'Text', data: ' since each point cloud is made of ' },
                    { type: 'Equation', data: '(x, y, z)' },
                    { type: 'Text', data: ', and ' },
                    { type: 'Equation', data: 'C = 3' },
                    { type: 'Text', data: ' if there are normals, ' },
                    { type: 'Equation', data: '(nx, ny, nz)' },
                    { type: 'Text', data: ', for each point in the PCD. It then outputs a matrix of ' },
                    { type: 'Equation', data: 'N\' \\times (d + C\')' },
                    { type: 'Text', data: ', where ' },
                    { type: 'Equation', data: 'N\'' },
                    { type: 'Text', data: ' is subsampled points with the same ' },
                    { type: 'Equation', data: 'd' },
                    { type: 'Text', data: '-dim coordinates and a new ' },
                    { type: 'Equation', data: 'C\'' },
                    { type: 'Text', data: '-dim feature vectors summarizing the local region’s context.' },
                ]
            },

            // Second-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'To choose a subset of points ' },
                    { type: 'Equation', data: '{x_{i_{1}}, x_{i_{2}}, \\ldots, x_{i_{m}}}' },
                    { type: 'Text', data: ' from given input point ' },
                    { type: 'Equation', data: '{x_i, x_2, \\ldots, x_n}' },
                    { type: 'Text', data: ' evenly, the paper used iterative Farthest Point Sampling (FPS). These set of points from input points defines the centroids of local regions.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'The FPS algorithm ' },
                    { type: 'Link', to: '#ref_3', className: 'blog_links', data: [{ type: 'Text', data: '[3]' }] },
                    { type: 'Text', data: ' is commonly used in PCD processing to down-sample points while preserving the overall structure and distribution of the point cloud. It works by firstly picking a random point (unless specified) and calculating the distance between the picked point and all the other points. It then selects the point that is farthest from the picked point. This is then repeated until the desired number of points is picked. This algorithm works better in selecting points over a PCD as compared to random sampling, given the same number of centroids.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'For example, imagine a PCD of a car. Random sampling might miss the wheels or roof, or you might end up with several points clustered in one region. This happens because random sampling doesn’t account for spatial relationships. But FPS ensures all parts are represented based on their spatial data and evenly samples the points across the whole PCD. As seen in ' },
                    { type: 'Link', to: "#fig_2", className: 'blog_links', data: "Figure 2" },
                    { type: 'Text', data: ', FPS outperforms random sampling. You can play around with the function in code(‘visualizer.py’) script. Please refer to ' },
                    { type: 'span', className: 'code', data: 'VisualizePCD_FPS_vs_RandomSampling' },
                    { type: 'Text', data: ' in ' },
                    { type: 'span', className: 'code', data: 'visualizer.py' },
                    { type: 'Text', data: ' script. Please refer to ' },
                    { type: 'Link', to: "#fifth_first", className: 'blog_links', data: "this section" },
                    { type: 'Text', data: ' for details.' },
                ]
            },
            { type: 'img', id: 'fig_2', className: 'Blog_Image', data: [Figure2, 'Figure 2: FPS vs Random Sampling'] },

            // Second-Second Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'This layer constructs the local region sets by finding the neighbouring points around the centroids (output of sampling layer). The grouping layer consists of an input point set of size ' },
                    { type: 'Equation', data: 'N \\times (d + C)' },
                    { type: 'Text', data: ', output of the ' },
                    { type: 'em', data: 'Sampling Layer' },
                    { type: 'Text', data: ', with coordinates of a set of centroids of size ' },
                    { type: 'Equation', data: 'N\' \\times d' },
                    { type: 'Text', data: '. It outputs groups of point sets of size ' },
                    { type: 'Equation', data: 'N\' \\times K \\times (d + C)' },
                    { type: 'Text', data: ', where each of the group corresponds to a local region with ' },
                    { type: 'Equation', data: 'K' },
                    { type: 'Text', data: ' being the number of points in the neighborhood of centroid points. ' },
                    { type: 'Equation', data: 'K' },
                    { type: 'Text', data: ' varies across groups because each centroid may lie in a dense or sparse region of the point cloud. However, the PointNet layer processes these variable-sized neighborhoods by applying shared MLPs to each point in the group, followed by a symmetric aggregation operation (e.g., max pooling). This converts the flexible number of points ' },
                    { type: 'Equation', data: '(K)' },
                    { type: 'Text', data: ' into a fixed-length feature vector for each local region.' }
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'The algorithm used to define local neighbourhoods of the centroids is called ball query. It works by finding all the points that are within a radius from the centroid. It works by firstly calculating the Euclidean distance in 3D space between the centroid point and all the point. If the distance is less than the specified radius, it is the neighbouring point around the centroid. An upper limit ' },
                    { type: 'Equation', data: 'K' },
                    { type: 'Text', data: ' is set so that there is a limit to the number of points to sample within each local region.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'An alternative of ball query is ' },
                    { type: 'Equation', data: 'K' },
                    { type: 'Text', data: ' Nearest Neighbour (kNN). However, compared to ball query, kNN search only finds a fixed number of neighbouring points. This can be very computationally expensive for large datasets due to distance calculations with every data point. Moreover, in sparse regions, kNN forces you to include distant points just to hit the fixed ' },
                    { type: 'Equation', data: 'K' },
                    { type: 'Text', data: ' quota. Similarly, in dense regions, kNN might exclude points that are geometrically critical but just outside the top ' },
                    { type: 'Equation', data: 'K' },
                    { type: 'Text', data: ' closest points. This means that there is a loss of local context, where it does not ensure all points within a meaningful geometric range are included. Additionally, ball query adapts to non-uniformity (e.g., non-uniform PCD from real world) while kNN struggles with it. As shown in ' },
                    { type: 'Link', to: "#fig_3", className: 'blog_links', data: "Figure 3" },
                    { type: 'Text', data: ', the ball query method (points inside the green sphere) selects points only within a fixed radius, whereas kNN (represented by the blue line/points) selects points until it reaches a predefined quota. The points selected by both ball query and kNN are highlighted in magenta. Additionally, the red points represent the centroids chosen by FPS, while the green points correspond to those selected exclusively by ball query. You can play around with the function ' },
                    { type: 'span', className: 'code', data: 'VisualizePCD_BallQuery_vs_kNN' },
                    { type: 'Text', data: ' in ' },
                    { type: 'span', className: 'code', data: 'visualizers.py' },
                    { type: 'Text', data: ' script. Please see ' },
                    { type: 'Link', to: "#fifth_second", className: 'blog_links', data: "this section" },
                    { type: 'Text', data: ' for details.' },
                ]
            },
            { type: 'img', id: 'fig_3', className: 'Blog_Image', data: [Figure3, 'Figure 3: Ball Query vs kNN'] },

            // Second-Third Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'The input of this layer, output of the ' },
                    { type: 'em', data: 'Grouping Layer' },
                    { type: 'Text', data: ', consists of ' },
                    { type: 'Equation', data: 'N\'' },
                    { type: 'Text', data: ' local regions of points with size ' },
                    { type: 'Equation', data: 'N\' \\times K \\times (d + C)' },
                    { type: 'Text', data: '. Each local region, ' },
                    { type: 'Equation', data: 'N\'' },
                    { type: 'Text', data: ', in the output is abstracted by its centroid and local feature that encodes the centroid’s neighbourhood. The output size is ' },
                    { type: 'Equation', data: 'N\' \\times (d + C\')' },
                    { type: 'Text', data: '. Before applying PointNet, as described in the ' },
                    { type: 'Link', to: "#first", className: 'blog_links', data: "this section" },
                    { type: 'Text', data: ', the coordinates of the points in the local region are translated into a local frame relative to the centroid point:' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'x_i^{(j)} = x_i^{(j)} - \\hat{x}^j' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Where:' },
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'li', data: [{ type: 'Equation', data: 'i' }, { type: 'Text', data: ' is the index of points in the local region with ' }, { type: 'Equation', data: 'i = 1, 2, \\ldots, K' }, { type: 'Text', data: ',' },] },
                    { type: 'li', data: [{ type: 'Equation', data: 'j' }, { type: 'Text', data: ' is the dimension of the coordinate space (3D for PCD) with ' }, { type: 'Equation', data: 'j = 1, 2, \\ldots, d' }, { type: 'Text', data: ' and,' },] },
                    { type: 'li', data: [{ type: 'Equation', data: '\\hat{x}' }, { type: 'Text', data: ' is the coordinate of the centroid' }] },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'By combining relative coordinates with the characteristics of individual points, we can identify the relationships between points within a local region' },
                ]
            },

            // Third Section
            { type: 'span', className: 'section_title sectionIcon', id: sectionLinks.shift(), icon: faSection, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'As mentioned previously, point sets often exhibit uneven density across regions, which creates a problem for feature learning as features effective in dense areas may not translate to sparse ones, and models trained on sparse data might miss fine local details. Ideally, we’d closely analyze dense regions for intricate patterns, but in sparse areas, sampling limitations distort these details, requiring us to seek broader patterns over larger areas instead. To tackle this, PointNet++ has been introduced which is a hierarchical network with density-adaptive PointNet layers (' },
                    { type: 'Link', to: "#fig_4", className: 'blog_links', data: "Figure 4" },
                    { type: 'Text', data: ') that adjust feature extraction by intelligently combining multiple scales of local patterns based on input density, unlike the single-scale approach seen in the ' },
                    { type: 'Link', to: "#second", className: 'blog_links', data: "section above" },
                    { type: 'Text', data: ', using two proposed layer types for grouping and merging features.' },
                ]
            },
            { type: 'img', id: 'fig_4', className: 'Blog_Image', data: [Figure4, 'Figure 4: (a) Multi-Scale Grouping; (b) Multi-Resolution Grouping', { width: '400px', height: 'auto' }, { type: 'Link', to: '#ref_1', className: 'blog_links', data: [{ type: 'Text', data: '[1]' }] }] },

            // Third-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'MSG is shown in ' },
                    { type: 'Link', to: "#fig_4", className: 'blog_links', data: "Figure 4(a)" },
                    { type: 'Text', data: ' where to effectively capture multi-scale patterns, you can apply grouping layers made up at difference scales. This is then followed by according PointNets to extract features at each scale. The features from different scales are then concatenated to form the multi-scale feature. This is a computationally expensive method since it for every centroid points it runs local PointNet at large scale neighbourhoods. In the lowest level, the number of centroids is high, hence it is more time consuming. The lowest level refers to the initial layers of the network that process the raw, high-resolution input data (i.e., the original dense set of points).' },
                ]
            },

            // Third-Second Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'MRG is shown in ' },
                    { type: 'Link', to: "#fig_4", className: 'blog_links', data: "Figure 4(b)" },
                    { type: 'Text', data: '. This method is computationally more efficient than MSG while retaining the capability to adaptively aggregate information based on the distributional characteristics of the points. This means that MRG dynamically adjusts feature extraction based on the density and arrangement of points in a local region. Looking at ' },
                    { type: 'Link', to: "#fig_4", className: 'blog_links', data: "Figure 4(b)" },
                    { type: 'Text', data: ', the features of a region at level ' },
                    { type: 'Equation', data: 'L_i' },
                    { type: 'Text', data: ' are formed by combining two vectors. The first vector (left in the figure) is generated by aggregating features from subregions at the lower level ' },
                    { type: 'Equation', data: 'L_{i-1}' },
                    { type: 'Text', data: ' using a set abstraction mechanism. The second vector (right) is derived by directly processing all raw points within the local region using a single PointNet.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'For example, in regions with low point density, the first vector may be less reliable because the subregions used to compute it contain even fewer points, leading to potential sampling issues. In such cases, the second vector, which captures information directly from the raw points, should be given more weight. Conversely, in regions with high point density, the first vector becomes more valuable as it encodes finer details by recursively examining higher resolutions at lower levels.' },
                ]
            },

            // Third-Third Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'SSG is a simpler and more computationally efficient approach compared to MSG and MRG. Instead of capturing features at multiple scales or resolutions, SSG operates at a single fixed scale for each layer. This means that for every centroid point, features are extracted from a local neighborhood of a predefined size using a PointNet. The extracted features are then aggregated to form the representation for that region.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'For example, in a 3D object recognition task, SSG might process point clouds by grouping points within a fixed radius around each centroid, capturing local geometric patterns like edges or surfaces. While this method is less flexible than MSG or MRG in handling varying point densities and scales, it is significantly faster and easier to implement. However, it may struggle in scenarios where multi-scale patterns are critical, such as in complex scenes with objects of varying sizes or sparse point distributions.' },
                ]
            },

            // Third-Fourth Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'During training, the model employs a technique called random input dropout to optimize how multi-scale features are combined. Here’s how it works: for each training point set, a dropout ratio ' },
                    { type: 'Equation', data: '\\theta' },
                    { type: 'Text', data: ' is uniformly sampled from the range ' },
                    { type: 'Equation', data: '[0, p]' },
                    { type: 'Text', data: ' where ' },
                    { type: 'Equation', data: 'p \\leq 1' },
                    { type: 'Text', data: '. Each point in the set is then randomly dropped with a probability of ' },
                    { type: 'Equation', data: '\\theta' },
                    { type: 'Text', data: '. In practice, ' },
                    { type: 'Equation', data: 'p' },
                    { type: 'Text', data: ' is set to 0.95 to ensure that no point set becomes completely empty.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'For example, if ' },
                    { type: 'Equation', data: '\\theta = 0.6' },
                    { type: 'Text', data: ', approximately 60% of the points in the set will be dropped, creating a sparser and less uniform distribution. This process forces the network to learn robust features from point sets with varying levels of sparsity and non-uniformity, improving its ability to generalize. However, during testing, all points are retained to ensure consistent and accurate predictions.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'This approach mimics real-world scenarios where point clouds may have missing or unevenly distributed data, such as in LiDAR scans where obstacles or sensor limitations can cause gaps in the captured points. By training on these diverse conditions, the model becomes more adaptable and reliable in practical applications.' },
                ]
            },

            // Third-Fifth Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'With this, let’s look at the supplementary materials ' },
                    { type: 'Link', to: '#ref_4', className: 'blog_links', data: [{ type: 'Text', data: '[4]' }] },
                    { type: 'Text', data: ' to define the network (PointNet++) architectures for SSG, MSG, and MRG for all classification experiments. Before going into it, let’s first look at the notations to describe them:' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA(K, r, [l_i, \\ldots, l_d])' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'This represents a SA level with the following components: ' },
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'li', data: [{ type: 'Equation', data: 'K' }, { type: 'Text', data: ': The number of local regions (centroids) to process' },] },
                    { type: 'li', data: [{ type: 'Equation', data: 'r' }, { type: 'Text', data: ': The radius defining the neighbourhood for grouping layers around each centroid' },] },
                    { type: 'li', data: [{ type: 'Equation', data: '[l_1, \\ldots, l_d]' }, { type: 'Text', data: ': The widths of the Fully Connected (FC) layers in the PointNet applied to each local region. Here, ' }, { type: 'Equation', data: 'l_1, \\ldots, l_d' }, { type: 'Text', data: ', specify the number of neurons in each of the ' }, { type: 'Equation', data: 'd' }, { type: 'Text', data: ' layers.' },] },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'To convert sets of local features into a single global feature vector, a global SA level is used, which is defined as:' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA([l_i, \\ldots, l_d])' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'For multi-scale settings (MSG), to represent MSG with m scales, the architecture can be described as follows: ' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA\\big(K, [r^{(1)}, \\ldots, r^{(m)}], \\big[ [l_1^{(1)}, \\ldots, l_d^{(1)}], \\ldots, [l_1^{(m)}, \\ldots, l_d^{(m)}] \\big]\\big)' }
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Where each component represents: ' },
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'li', data: [{ type: 'Equation', data: 'K' }, { type: 'Text', data: ': The number of local regions (centroids) to process' },] },
                    { type: 'li', data: [{ type: 'Equation', data: '[r^{(1)}, \\ldots, r^{(m)}]' }, { type: 'Text', data: ': A list of radii defining the neighborhood scales for grouping points around each centroid.' },] },
                    { type: 'li', data: [{ type: 'Equation', data: '[l_1^{(1)}, \\ldots, l_d^{(1)}], \\ldots, [l_1^{(m)}, \\ldots, l_d^{(m)}]' }, { type: 'Text', data: ': The FC layer widths for PointNet applied at each scale. For each scale ' }, { type: 'Equation', data: 'm' }, { type: 'Text', data: ', ' }, { type: 'Equation', data: 'l_1, \\ldots, l_d' }, { type: 'Text', data: ' define the widths of the d layers in the PointNet.' },] }
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Finally, the FC layer is described as: ' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'FC(l, dp)' }
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'li', data: [{ type: 'Equation', data: 'l' }, { type: 'Text', data: ': The width of FC layer (number of neurons)' },] },
                    { type: 'li', data: [{ type: 'Equation', data: 'dp' }, { type: 'Text', data: ': The dropout ratio applied to the layer' },] }
                ]
            },

            {
                type: 'span', className: 'body', data: [
                    { type: 'Space' },
                    { type: 'Text', data: 'With this, from the supplementary materials ' },
                    { type: 'Link', to: '#ref_4', className: 'blog_links', data: [{ type: 'Text', data: '[4]' }] },
                    { type: 'Text', data: ', lets define the SSG, MSG, and MRG architectures:' },
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'li', data: [{ type: 'strong', data: 'SSG Architecture: ' }, { type: 'Text', data: 'The SSG architecture is as follows: ' }] },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA(512, 0.2, [64, 64, 128]) \\rightarrow SA(128, 0.4, [128, 128, 256]) \\rightarrow' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA([256, 512, 1024]) \\rightarrow FC(512, 0.5) \\rightarrow FC(256, 0.5) \\rightarrow FC(K)' },
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'Space' },
                    { type: 'li', data: [{ type: 'strong', data: 'MSG Architecture: ' }, { type: 'Text', data: 'The MSG architecture is as follows: ' }] },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA(512, [0.1, 0.2, 0.3], \\big[[32, 32, 64], [64, 64, 128], [64, 96, 128]\\big]) \\rightarrow' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA(128, [0.2, 0.4, 0.8], \\big[[64, 64, 128], [128, 128, 256], [128, 128, 256]\\big]) \\rightarrow' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Equation', data: 'SA([256, 512, 1024]) \\rightarrow FC(512, 0.5) \\rightarrow FC(256, 0.5) \\rightarrow FC(K)' },
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'Space' },
                    { type: 'li', data: [{ type: 'strong', data: 'MRG Architecture: ' }, { type: 'Text', data: 'The MRG architecture uses three branches:' }] },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Text', data: 'Branch 1: ' },
                    { type: 'Equation', data: 'SA(512, 0.2, [64,64,128]) \\rightarrow SA(64, 0.4, [128, 128, 256])' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Text', data: 'Branch 2: ' },
                    { type: 'Equation', data: 'SA(512, 0.4, [64, 128, 256])' },
                    { type: 'Text', data: 'using' },
                    { type: 'Equation', data: 'r = 0.4' },
                    { type: 'Text', data: ' regions of original points' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Text', data: 'Branch 3: ' },
                    { type: 'Equation', data: 'SA(64, 128, 256, 512])' },
                    { type: 'Text', data: ' using all original points' },
                ]
            },
            {
                type: 'span', className: 'body center', data: [
                    { type: 'Text', data: 'Branch 4: ' },
                    { type: 'Equation', data: 'SA(256, 512, 1024])' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'Branch 1 and branch 2 are concatenated and fed into branch 4. Output of branch 3 and branch 4 are then concatenated and fed into ' },
                    { type: 'Equation', data: 'FC(512, 0.5) \\rightarrow FC(256, 0.5) \\rightarrow FC(K)' },
                    { type: 'Text', data: ' for classification.' },
                ]
            },

            // Fourth Section
            { type: 'span', className: 'section_title sectionIcon', id: sectionLinks.shift(), icon: faSection, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'With that said, looking at Figure 4 in Section 4 of the PointNet++ paper ' },
                    { type: 'Link', to: '#ref_1', className: 'blog_links', data: [{ type: 'Text', data: '[1]' }] },
                    { type: 'Text', data: ', this figure illustrates the effectiveness of the density adaptive strategy in handling non-uniform point cloud density. Specifically, it compares the performance of six variants of PointNet and PointNet++ models: vanilla PointNet, vanilla PointNet+DP, SSG, SSG+DP, MSG+DP, and MRG+DP. Adding DP during training helps the model generalize better to non-uniformly sampled point clouds. Without DP, the models are trained exclusively on uniform dense point clouds.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'The models were evaluated on an unseen portion of the dataset using point clouds with varying numbers of points: 128, 256, 512, and 1024 points. This evaluation demonstrates the robustness of each model to variations in point density, particularly when the number of points is reduced. The results highlight that PointNet++ significantly outperforms the vanilla PointNet in shape classification accuracy, especially under sparse and non-uniform sampling conditions. The key observations from this figure are:' },
                ]
            },
            {
                type: 'ul', className: 'body', data: [
                    { type: 'li', data: [{ type: 'Text', data: 'MSG+DP and MRG+DP exhibit remarkable robustness to density variations, with performance dropping by less than 1% even when the number of points is reduced from 1024 to 256.' }] },
                    { type: 'li', data: [{ type: 'Text', data: 'SSG struggles to generalize to sparse point clouds, but this issue is fixed by adding random dropout during training (SSG+DP).' }] },
                    { type: 'li', data: [{ type: 'Text', data: 'Vanilla PointNet shows some robustness to density variations due to its focus on global features, but it lacks the fine-grained detail capture capability of PointNet++, resulting in lower overall performance.' }] },
                ]
            },

            // Fifth Section
            { type: 'span', className: 'section_title sectionIcon', id: sectionLinks.shift(), icon: faSection, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'To help visualize some of the concepts in this blog post, I have created visualizer classes. To setup the visualizers, firstly download the GitHub repository and install the necessary libraries needed by running the shell commands below:' },
                ]
            },
            {
                type: 'CodeBlock', title: 'Shell', extraText: [
                    [{ type: 'shell', code: "git clone https://github.com/blank-ed/Understanding-PointNet-PlusPlus.git" }],
                    [{ type: 'shell', code: "git clone cd Understanding-PointNet-PlusPlus && pip install -r requirements.txt" }],
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'This will install the latest versions of the required libraries. If you want to stick with the versions that I used, you can run the shell script below:' },
                ]
            },
            {
                type: 'CodeBlock', title: 'Shell', extraText: [
                    [{ type: 'shell', code: "pip install open3d==0.19.0 PySide6==6.8.2.1 fpsample==0.3.3" }],
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'To download the dataset, you can ' },
                    { type: 'span', className: 'code', data: 'git clone' },
                    { type: 'Text', data: ' from ' },
                    { type: 'Link', to: "https://github.com/madlabub/Machining-feature-dataset.git", className: 'blog_links', data: "this repository" },
                    { type: 'Text', data: ', extract the ' },
                    { type: 'span', className: 'code', data: 'dataset.rar' },
                    { type: 'Text', data: ', and copy all 24 folders inside ' },
                    { type: 'span', className: 'code', data: 'dataset/stl/' },
                    { type: 'Text', data: ' into ' },
                    { type: 'span', className: 'code', data: 'MFD_dataset' },
                    { type: 'Text', data: ' directory. The visualizer classes allow you to select a random STL file or a specific STL file from the dataset folder ' },
                    { type: 'span', className: 'code', data: 'MFD_dataset' },
                    { type: 'Text', data: ' and convert them into a user specified number of points PCD by using a slider between the range of user specified minimum and maximum number of points. Depending on the type of visualization, the settings/parameters and the visualization window will be different. This visualizer is created using ' },
                    { type: 'span', className: 'code', data: 'PySide6' },
                    { type: 'Text', data: ' with ' },
                    { type: 'span', className: 'code', data: 'open3d' },
                    { type: 'Text', data: ' embedded inside for PCD processing. The available visualizer classes and their settings/parameters will be explained in the sections below. You can run each of the visualizers by running the following script:' },
                ]
            },
            {
                type: 'CodeBlock', title: "Python", extraText: [
                    [{ type: 'd', code: '"""Visualizers for PCD Data"""' }],
                    [{ type: '', code: '' }],
                    [{ type: 'a', code: 'from' }, { type: 'b', code: ' visualizers' }, { type: 'a', code: ' import' }, { type: 'b', code: ' (' },],
                    [{ type: 'b', code: '    VisualizerPCD_FPS_vs_RandomSampling,' },],
                    [{ type: 'b', code: '    VisualizePCD_BallQuery_vs_kNN,' },],
                    [{ type: 'b', code: ')' },],
                    [{ type: '', code: '' }],
                    [{ type: 'a', code: 'if' }, { type: 'b', code: ' __name__ == ' }, { type: 'c', code: '\'__main__\'' }],
                    [{ type: 'e', code: '    # Run the desired visualizer by uncommenting its line.' }],
                    [{ type: 'b', code: '    VisualizePCD_FPS_vs_RandomSampling.run()  ' }, { type: 'e', code: '# FPS vs Random Sampling Visualizer' }],
                    [{ type: 'e', code: '    # VisualizePCD_BallQuery_vs_kNN.run()     # Ball Query vs kNN Visualizer' }],
                ]
            },

            // Fifth-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Link', to: "#fig_5", className: 'blog_links', data: "Figure 5" },
                    { type: 'Text', data: ' shows the visualizer class for comparing FPS and random sampling. This visualizer allows you to down-sample the currently user specified PCD points to user specified sampling PCD points. The output of FPS sampled PCD points is shown on the left and randomly selected PCD points is shown on the right, while the original PCD points is shown on the top right window. The number of sample points is between minimum of 100 points to maximum of the total number of user specified PCD points. Please refer to ' },
                    { type: 'Link', to: "#second", className: 'blog_links', data: "this section" },
                    { type: 'Text', data: ' for more details.' },
                ]
            },
            { type: 'img', id: 'fig_5', className: 'Blog_Image', data: [Figure5, 'Figure 5: FPS vs Random Sampling Visualizer'] },

            // Fifth-Second Section
            { type: 'span', className: 'subSection_title sectionIcon', id: sectionLinks.shift(), icon: faBars, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Link', to: "#fig_6", className: 'blog_links', data: "Figure 6" },
                    { type: 'Text', data: ' shows the visualizer class used to compare the ball query algorithm with kNN. Similar to the previous section, this visualizer allows you to down-sample the current user-specified PCD points to a user-specified set of sampled points using the FPS algorithm. The down-sampled points (centroids) are highlighted in red on top of the original gray PCD points. From these FPS-generated centroids, a random point is selected to visualize the comparison between the two algorithms. All points selected by the ball query algorithm are enclosed within a green wireframe sphere and displayed as green points, while those selected by the kNN algorithm are represented by blue points connected with blue lines. Points selected by both algorithms are colored magenta. The user can specify the radius for the ball query algorithm and the number of nearest neighbors (k) to select from the centroid for both algorithms. Please refer to ' },
                    { type: 'Link', to: "#second", className: 'blog_links', data: "this section" },
                    { type: 'Text', data: ' for more details.' },
                ]
            },
            { type: 'img', id: 'fig_6', className: 'Blog_Image', data: [Figure6, 'Figure 6: Ball Query vs kNN Visualizer'] },

            // Sixth Section
            { type: 'span', className: 'section_title sectionIcon', id: sectionLinks.shift(), icon: faSection, data: tocTitles.shift() },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'For the next blog, I want to recreate the figure I mentioned above, where I will train six variants of PointNet++ models for classification: SSG, SSG+DP, MSG, MSG+DP, MRG, and MRG+DP with maximum DP ratio set to 0.95 (as per their ' },
                    { type: 'Link', to: "https://github.com/charlesq34/pointnet2", className: 'blog_links', data: "original code" },
                    { type: 'Text', data: '). They will then be tested on the same testing dataset with the same varying number of points (128, 256, 512, and 1024) so we can see and understand their performance. I will be using a ' },
                    { type: 'Link', to: 'https://github.com/madlabub/Machining-feature-dataset', className: 'blog_links', data: 'machining feature dataset' },
                    { type: 'Text', data: ', which is proposed in this paper ' },
                    { type: 'Link', to: '#ref_5', className: 'blog_links', data: [{ type: 'Text', data: '[5]' }] },
                    { type: 'Text', data: ' aiming to recognize unique machining features from CAD models using deep learning. The structure of the dataset consists of 24 sub-folders, each corresponding to a distinct machining feature, labeled from 0 to 23 followed by the machining features name. Each sub-folder contains 1,000 randomly generated .STL files, created based on the specific parameters of the respective machining feature. I will not delve into the methods used to randomly generate the CAD models. For a deeper understanding of the reasoning behind this dataset, I recommend referring to ' },
                    { type: 'Link', to: '#ref_5', className: 'blog_links', data: [{ type: 'Text', data: '[5]' }] },
                    { type: 'Text', data: '.' },
                ]
            },
            { type: 'unique_code', className: 'BlogPage1Data_CADModel', data: <CADModelSection /> },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'The GUI above illustrates an interactive visual on the different machining features available from the dataset. You can view them in point clouds or as a solid block. This is built using ' },
                    { type: 'span', className: 'code', data: 'ReactJS' },
                    { type: 'Text', data: ' and ' },
                    { type: 'span', className: 'code', data: 'Three.js' },
                    { type: 'Text', data: ', where STL files are loaded and displayed as either solid models or point cloud representations. The models are rendered in a 3D canvas with user-controlled navigation via ' },
                    { type: 'span', className: 'code', data: 'OrbitControls' },
                    { type: 'Text', data: ', and the display can toggle between solid geometry and a point cloud generated by sampling points proportional to triangle areas in the model.' },
                ]
            },
            {
                type: 'span', className: 'body', data: [
                    { type: 'Text', data: 'All the codes used for this blog can be accessed on this ' },
                    { type: 'Link', to: "", className: 'blog_links', data: "GitHub repository" },
                    { type: 'Text', data: '.' },
                ]
            },

            // References
            { type: 'span', className: 'section_title reference_section_title sectionIcon', id: 'references', icon: faSection, data: 'References' },
            referencesContent,

            // Footer
            footer_content({ BlogIndex: BlogIndex, previous_link: false, next_link: true })
        ]
    }
]

// Add subtitle content (published date, word count, reading time, and folder name)
blogpage_subtitle_content({ BlogIndex: BlogIndex, BlogPageData: BlogPage1Data })

export default BlogPage1Data;