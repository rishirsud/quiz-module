import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>Start</>} />
          <Route path="/quiz" element={<>Quiz</>} />
          <Route path="/results" element={<>Results</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
