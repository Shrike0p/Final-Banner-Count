import React, { useState, useEffect } from 'react';

const Banner = ({ visible, title, description, timer, link, onUpdate }) => {
    const [timeRemaining, setTimeRemaining] = useState(timer);
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        if (visible && timer > 0) {
            setTimeRemaining(timer);
            const interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0; // Stop countdown at 0
                    }
                    return prev - 1; // Decrement the timer by 1 second
                });
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setTimeRemaining(0); // Hide the banner if not visible
        }
    }, [visible, timer]);

    // Function to format the time remaining into days, hours, minutes, and seconds
    const formatTime = (totalSeconds) => {
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
    };

    const handleUpdateDescription = () => {
        onUpdate(newDescription);
        setNewDescription('');
    };

    const { days, hours, minutes, seconds } = formatTime(timeRemaining);

    return (
        <div>
            {visible && timeRemaining > 0 && (
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center mb-6">
                    <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
                    <p className="text-lg text-center mb-4" dangerouslySetInnerHTML={{ __html: description }}></p>

                    <div className="flex space-x-2 mb-4">
                        <div className="timer-box bg-gray-400 text-black w-16 h-16 flex justify-center items-center rounded-lg transition-transform transform hover:scale-105">
                            {String(days).padStart(2, '0')}
                        </div>
                        <div className="timer-box bg-gray-400 text-black w-16 h-16 flex justify-center items-center rounded-lg transition-transform transform hover:scale-105">
                            {String(hours).padStart(2, '0')}
                        </div>
                        <div className="timer-box bg-gray-400 text-black w-16 h-16 flex justify-center items-center rounded-lg transition-transform transform hover:scale-105">
                            {String(minutes).padStart(2, '0')}
                        </div>
                        <div className="timer-box bg-gray-400 text-black w-16 h-16 flex justify-center items-center rounded-lg transition-transform transform hover:scale-105">
                            {String(seconds).padStart(2, '0')}
                        </div>
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
                    </div>
                </div>
            )}

            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Update Description</h3>
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="border border-gray-300 p-2 rounded text-black w-full"
                    placeholder="Enter new description"
                />
                <button onClick={handleUpdateDescription} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                    Update
                </button>
            </div>
        </div>
    );
};

export default Banner;
