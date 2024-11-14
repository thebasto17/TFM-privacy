import React from "react";
import { Routes, Route } from "react-router-dom";
import SelectionMenu from "./pages/SelectionMenu";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<SelectionMenu />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
