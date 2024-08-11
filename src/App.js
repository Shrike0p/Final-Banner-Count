import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import './style.css'; // Ensure you import your styles

const App = () => {
    const [bannerData, setBannerData] = useState(null);
    const [isBannerVisible, setIsBannerVisible] = useState(false); // Manage banner visibility
    const [isDashboardVisible, setIsDashboardVisible] = useState(false); // Manage dashboard visibility

    useEffect(() => {
        const fetchBanner = async () => {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/api/banner');
            setBannerData(response.data);
        };
        fetchBanner();
    }, []);

    const handleUpdate = async (updatedBanner) => {
        const response = await axios.post('${process.env.REACT_APP_API_URL}/api/banner', updatedBanner);
        setBannerData(response.data);
    };

    const handleShowBanner = () => {
        setIsBannerVisible(true); // Show the banner
        setIsDashboardVisible(false); // Hide the dashboard
    };

    const handleStopBanner = () => {
        setIsBannerVisible(false); // Hide the banner
        setIsDashboardVisible(true); // Show the dashboard directly
    };

    const handleFinishBanner = () => {
        setIsBannerVisible(false); // Hide the banner when countdown finishes
        setIsDashboardVisible(true); // Show the dashboard directly
    };

    const handleUpdateDescription = async (newDescription) => {
        const updatedBanner = { ...bannerData, description: newDescription }; // Create updated banner object
        await handleUpdate(updatedBanner); // Call the update function
    };

    return (
        <div className="p-4">
            {isBannerVisible && (
                <Banner 
                    visible={isBannerVisible} // Pass the visibility state to Banner
                    description={bannerData?.description} 
                    timer={bannerData?.timer} 
                    link={bannerData?.link} 
                    onStop={handleStopBanner} // Pass the stop function to Banner
                    onFinish={handleFinishBanner} // Pass the finish function to Banner
                    onUpdate={handleUpdateDescription} // Pass the update function to Banner
                />
            )}
            {isDashboardVisible && (
                <div className="fade-in">
                    <Dashboard 
                        onUpdate={handleUpdate} 
                        onToggleBanner={() => setIsBannerVisible(prev => !prev)} // Toggle visibility state
                        isBannerVisible={isBannerVisible} // Pass current visibility state
                    />
                </div>
            )}
            {!isDashboardVisible && !isBannerVisible && (
                <button 
                    onClick={handleShowBanner} 
                    className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Show Banner
                </button>
            )}
        </div>
    );
};

export default App;
