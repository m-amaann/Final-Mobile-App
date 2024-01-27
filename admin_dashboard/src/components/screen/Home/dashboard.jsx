import React from "react";
import "../../../App.css";
import Chart from "../../common/chart/Chart";
import FeaturesWidgets from "../FeatureInfo/FeaturesWidgets";

const Dashboard = () => {
  return (
    <>
      <div className="totle-section">
        <h2>DASHBOARD</h2>
        <p>Welcome to our dashboard</p>
      </div>

      <div className="Home">
        <FeaturesWidgets />
        <Chart />
      </div>
    </>
  );
};

export default Dashboard;
