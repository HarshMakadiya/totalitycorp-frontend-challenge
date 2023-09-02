import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Toaster} from "react-hot-toast" 
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
function App() {
  return (
    <div className="App">
      <Router>
        <Toaster/>
        <Navbar />
        <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
