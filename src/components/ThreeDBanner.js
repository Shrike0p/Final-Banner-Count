import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDBanner = ({ visible, description, timer, link, onStop, onFinish }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!visible) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create a 3D cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Countdown logic
        const interval = setInterval(() => {
            timer--;
            if (timer <= 0) {
                clearInterval(interval);
                onFinish(); // Call onFinish when the timer ends
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            mountRef.current.removeChild(renderer.domElement); // Cleanup
        };
    }, [visible, timer, onFinish]);

    return (
        <div ref={mountRef} className="banner-container">
            <div className="text-overlay">
                <h2 className="text-white">{description}</h2>
                <button onClick={onStop} className="bg-red-500 text-white px-4 py-2 rounded">Stop</button>
                <a href={link} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded">Click Here</a>
            </div>
        </div>
    );
};

export default ThreeDBanner;
