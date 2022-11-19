import React from 'react';
import '../css/Home.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home-main-box">
                <Sidebar />

                home page
            </div>
        </>
    );
};

export default Home;
