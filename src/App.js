import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Bio from './components/Bio';

function App() {
  return (
    <BrowserRouter>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
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
