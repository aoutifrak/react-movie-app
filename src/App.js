import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Watchtv from './pages/Watchtv';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/watchtv/:id/:s/:e" element={<Watchtv />} />
    </Routes>
  </Router>
  );
}

export default App;
