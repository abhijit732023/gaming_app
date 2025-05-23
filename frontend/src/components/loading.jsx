import React from "react";
import { Quantum } from "ldrs/react"; // Import Quantum loader
import "ldrs/react/Quantum.css"; // Import Quantum loader styles

const Loading = () => {
  return (
    <div className="flex absolute z-50 items-center justify-center min-h-screen  text-white">
      <Quantum size="149" speed="4.0" color="#fbbf24" /> {/* Quantum loader */}
      
    </div>
  );
};

export default Loading;
