import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
    {/* <Home/> */}

    <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/About" element={<About />}> </Route>
        </Routes>
        </Router>
    </>
  );
}

export default App;
