import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Testing from "./Pages/Testing";
import LandingPage from "./Pages/Landing";
import Results from "./Pages/Results";
import Select from "./Pages/Select";
import Summary from "./Pages/Summary";
import CameraCapture from "./Pages/CameraCapture";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Testing" element={<Testing />} />
        <Route path="/Results" element={<Results />} />
        <Route path="/CameraCapture" element={<CameraCapture />} />
        <Route path="/Select" element={<Select />} />
        <Route path="/Summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
