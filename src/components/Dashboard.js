import React, { useState } from 'react';

const Dashboard = ({ onUpdate, onToggleBanner, isBannerVisible }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!title) {
            setError('Title is required');
            return;
        }
        if (!description) {
            setError('Description is required');
            return;
        }
        if (!days && !hours && !minutes) {
            setError('At least one timer value must be provided');
            return;
        }
        if (!link.startsWith('https://')) {
            setError('Link must start with "https://"');
            return;
        }

        const totalSeconds = (days * 24 * 3600) + (hours * 3600) + (minutes * 60);
        
        // Pass title, formatted description, timer, link, and visibility status
        onUpdate({ title, description, timer: totalSeconds, link, visible: isBannerVisible });
        
        // Clear the input fields after update
        setTitle('');
        setDescription('');
        setDays(0);
        setHours(0);
        setMinutes(0);
        setLink('');
    };

    // Function to format the description text
    const formatText = (command) => {
        document.execCommand(command, false, null);
    };

    const addBulletPoint = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const li = document.createElement('li');
            li.textContent = selection.toString();
            range.deleteContents();
            range.insertNode(li);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Banner Title"
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Formatting Tools for Description */}
                <div className="flex space-x-2 mb-2">
                    <button type="button" onClick={() => formatText('bold')} className="bg-gray-200 rounded px-2 py-1">B</button>
                    <button type="button" onClick={() => formatText('italic')} className="bg-gray-200 rounded px-2 py-1">I</button>
                    <button type="button" onClick={() => formatText('underline')} className="bg-gray-200 rounded px-2 py-1">U</button>
                    <button type="button" onClick={addBulletPoint} className="bg-gray-200 rounded px-2 py-1">•</button>
                </div>
                
                {/* Description input */}
                <div 
                    contentEditable
                    onInput={(e) => setDescription(e.currentTarget.innerHTML)} // Set HTML content
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Banner Description"
                ></div>

                <div className="flex space-x-2">
                    <input
                        type="number"
                        value={days}
                        onChange={e => setDays(Number(e.target.value))}
                        placeholder="Days"
                        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        value={hours}
                        onChange={e => setHours(Number(e.target.value))}
                        placeholder="Hours"
                        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        value={minutes}
                        onChange={e => setMinutes(Number(e.target.value))}
                        placeholder="Minutes"
                        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
