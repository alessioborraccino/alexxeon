import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Bio from './components/Bio';

function App() {
  return (
    <BrowserRouter>
        <div className="main">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bio" element={<Bio />} />
        </Routes>
        </div>  
    </BrowserRouter>
  );
}

export default App;
