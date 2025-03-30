import "./App.css";
import Home from "./Home/Home";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<h1>About us</h1>} /> */}
      </Routes>
    </div>
  );
}

export default App;
