import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import "../src/styles/layout.css"
import "../src/styles/authentication.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
          <Routes>
            <Route path="/" exact element={localStorage.getItem("currentUser")?<Home />:<Navigate to="/login" />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/admin" exact element={<Admin />} />
            <Route path="/productInfo/:productID" exact element={localStorage.getItem("currentUser")?<ProductInfo />:<Navigate to="/login" />} />
            <Route path="/cart" exact element={localStorage.getItem("currentUser")?<Cart />:<Navigate to="/login" />} />
            <Route path="/orders" exact element={localStorage.getItem("currentUser")?<Orders />:<Navigate to="/login" />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
