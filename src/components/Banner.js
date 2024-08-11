import React, { useState, useEffect } from 'react';

const Banner = ({ visible, description, timer, link, onStop, onUpdate }) => {
    const [countdown, setCountdown] = useState(timer);
    const [newDescription, setNewDescription] = useState(''); // Initialize with an empty string

    useEffect(() => {
        if (visible && timer > 0) {
            setCountdown(timer); // Reset countdown when timer changes
            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0; // Stop countdown at 0
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        } else {
            setCountdown(0); // Hide the banner if not visible
        }
    }, [visible, timer]);

    const handleUpdateDescription = () => {
        onUpdate(newDescription); // Call the update function with the new description
        setNewDescription(''); // Clear the input field after update
    };

    return (
        visible && countdown > 0 && (
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">{description}</h2>
                    <p className="text-lg">{countdown}s remaining</p>
                </div>
                <div className="flex space-x-2">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition duration-300"
                    >
                        Click Here
                    </a>
                    <button 
                        onClick={onStop} 
                        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
                    >
                        Stop
                    </button>
                    <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="border border-gray-300 p-2 rounded text-black" // Changed text color to black
                        placeholder="Update Description"
                    />
                    <button onClick={handleUpdateDescription} className="bg-green-500 text-white px-4 py-2 rounded">
                        Update
                    </button>
                </div>
            </div>
        )
    );
};

export default Banner;
