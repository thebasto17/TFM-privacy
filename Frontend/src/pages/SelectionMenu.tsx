// src/pages/SelectionMenu.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const SelectionMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Top-right Connect Button */}
      <div className="absolute top-4 right-4">
        <ConnectButton />
      </div>

      <div className="flex flex-col justify-center items-center h-full px-4">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-gray-800 text-center">
          Purchase Options
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-8 text-center">
          Select the type of purchase you would like to make:
        </p>

        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
          <div className="bg-gray-600 hover:bg-gray-700 cursor-pointer w-full sm:w-64 h-40 sm:h-48 md:h-64 rounded-lg flex flex-col justify-center items-center text-base sm:text-lg md:text-xl font-semibold text-white shadow-lg min-w-[200px] sm:min-w-[250px]">
            <span className="block">Regular</span>
            <span className="block">Purchase</span>
          </div>
          <div
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full sm:w-64 h-40 sm:h-48 md:h-64 rounded-lg flex flex-col justify-center items-center text-base sm:text-lg md:text-xl font-semibold text-white shadow-lg min-w-[200px] sm:min-w-[250px]"
            onClick={() => navigate("/home")}
          >
            <span className="block">Private</span>
            <span className="block">Purchase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionMenu;
