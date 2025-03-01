import Image1 from './placeholderimage.jpg'

import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Edges, Html } from '@react-three/drei'; // optional helper
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";

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

import { faBars, faCalendarDays, faChevronRight, faClock, faFolderOpen, faPen, faSection, faTag } from '@fortawesome/free-solid-svg-icons';
import BlogData from '../BlogData';

const BlogIndex = 0;

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

    const handleCadTypeChange = (type) => {
        setCadType(type);
    };

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

                    { title: 'First section', type: 'Title', section_link: '#first' },
                    { title: 'First first section', type: 'SubTitle', section_link: '#first_first' },

                    { title: 'Second section', type: 'Title', section_link: '#second' },
                    { title: 'Second first section', type: 'SubTitle', section_link: '#second_first' },

                    { title: 'Third section', type: 'Title', section_link: '#third' },
                    { title: 'Third first section', type: 'SubTitle', section_link: '#third_first' },

                    { title: 'Fourth section', type: 'Title', section_link: '#fourth' },

                    { title: 'Conclusion', type: 'Title', section_link: '#conclusion' },

                    { title: 'References', type: 'Title', section_link: '#references' },
                ]
            },
        ]
    },

    // Content Section
    {
        type: 'div', className: 'BlogPage_ContentSection', data: [
            // Summary Section
            { type: 'span', className: 'section_title sectionIcon', id: 'summary', icon: faSection, data: 'Summary' },

            // First Section
            { type: 'span', className: 'section_title sectionIcon', id: 'first', icon: faSection, data: 'First section' },

            // First-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'first_first', icon: faBars, data: 'First first section' },
            { type: 'unique_code', className: 'BlogPage1Data_CADModel', data: <CADModelSection /> },

            // Second Section
            { type: 'span', className: 'section_title sectionIcon', id: 'second', icon: faSection, data: 'Second section' },

            // Second-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'second_first', icon: faBars, data: 'Second first section' },

            // Third Section
            { type: 'span', className: 'section_title sectionIcon', id: 'third', icon: faSection, data: 'Third section' },

            // Third-First Section
            { type: 'span', className: 'subSection_title sectionIcon', id: 'third_first', icon: faBars, data: 'Third first section' },

            // Fourth Section
            { type: 'span', className: 'section_title sectionIcon', id: 'fourth', icon: faSection, data: 'Fourth section' },

            // Conclusion Section
            { type: 'span', className: 'section_title sectionIcon', id: 'conclusion', icon: faSection, data: 'Conclusion' },

            // References
            { type: 'span', className: 'section_title reference_section_title sectionIcon', id: 'references', icon: faSection, data: 'References' },
            {
                type: 'table', className: 'reference_section_table', data: [

                ]
            },

            // Footer
            {
                type: 'span', className: 'blog_footer', data: [
                    // { type: 'span', className: 'body footer_left', data: [{ type: "Link", className: 'blog_links_inverse', to: '/blogpage/facial_landmark_detection', icon: faChevronLeft, position: 'left', data: 'Left Link Left Link Left Link Left Link' }] },
                    // { type: 'span', className: 'body footer_right', data: [{ type: "Link", className: 'blog_links_inverse', to: `${BlogData[1].article_link}`, icon: faChevronRight, position: 'right', data: `${BlogData[1].article_title}` }] }
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