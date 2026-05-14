import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Start</h1>} />
          <Route path="/quiz" element={<h1>Quiz</h1>} />
          <Route path="/results" element={<h1>Results</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
