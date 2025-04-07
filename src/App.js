// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SurveyForm from "./components/SurveyForm";
import ResultPage from "./components/ResultPage";
import EnterSerialPage from "./components/EnterSerialPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurveyForm />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/serial" element={<EnterSerialPage />} />
      </Routes>
    </Router>
  );
}

export default App;
