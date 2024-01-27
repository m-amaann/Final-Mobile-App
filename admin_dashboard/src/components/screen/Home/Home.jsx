import React from 'react';
import "../../../App.css";
import Chart from '../../common/chart/Chart';
import TopNavbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import FeaturesWidgets from '../FeatureInfo/FeaturesWidgets';

function Home() {
  return (
    <div className='mainbg'>
        <header class="top-navbar">
        <TopNavbar/>
      </header>
      <div class="main-container">
        <div class="sidebar">
          <Sidebar/>
        </div>
        <div class="main-content">
          <div className='totle-section'>
            <h2>DASHBOARD</h2>
            <p>Welcome to our dashboard</p>
          </div>

          <div className="Home">
            <FeaturesWidgets/>
            <Chart/>
          </div>    
        </div>
      </div>
    </div>
  )
}

export default Home