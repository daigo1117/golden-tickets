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
        <Route path="/serial" element={<EnterSerialPage />} />
        <Route path="/form" element={<SurveyForm />} />  {/* ← ここを修正！ */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<EnterSerialPage />} />  {/* フォールバック用 */}
      </Routes>
    </Router>
  );
}

export default App;
