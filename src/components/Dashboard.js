import React, { useState } from 'react';

const Dashboard = ({ onUpdate, onToggleBanner, isBannerVisible }) => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(10); // default timer
    const [link, setLink] = useState('');
    const [error, setError] = useState(''); // State for error messages

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Validation
        if (!description) {
            setError('Description is required');
            return;
        }
        if (!timer || timer <= 0) {
            setError('Timer must be a positive number');
            return;
        }
        if (!link.startsWith('https://')) {
            setError('Link must start with "https://"');
            return;
        }

        onUpdate({ description, timer: Number(timer), link }); // Pass timer as a number
        // Clear the input fields after update
        setDescription('');
        setTimer(10);
        setLink('');
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Banner Description"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    value={timer}
                    onChange={e => setTimer(e.target.value)}
                    placeholder="Timer (seconds)"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder="Banner Link (must start with https://)"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    Update Banner
                </button>
            </form>

            {/* Toggle Visibility */}
            <div className="mt-4 flex justify-between items-center">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isBannerVisible}
                        onChange={onToggleBanner}
                        className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="ml-2">{isBannerVisible ? 'Hide Banner' : 'Show Banner'}</span>
                </label>
                <button
                    onClick={onToggleBanner}
                    className={`ml-4 px-4 py-2 rounded-lg font-semibold ${isBannerVisible ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                >
                    {isBannerVisible ? 'Turn Off Banner' : 'Turn On Banner'}
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
