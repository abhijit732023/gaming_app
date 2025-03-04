import React from "react";

const Input = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon, 
  className = "" 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-white mb-1">{label}</label>}
      
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 pl-${Icon ? "10" : "3"} bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500`}
        />
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
