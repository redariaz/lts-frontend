import React from "react";
import "./spinner.css"; // Create a CSS file for the spinner styling (optional)

const Spinner = ({ loading }) => {
  if (!loading) return null; // Don't render anything if loading is false
  
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
