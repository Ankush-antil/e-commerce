import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import "./App.css"
import SearchBar from "./components/SearchBar";
import Product from "./pages/Product";
import { ToastContainer } from 'react-toastify'
import Cart  from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import Orders from "./pages/Orders"
import ReturnsPolicy from "./pages/ReturnsPolicy";
import ExchangePolicy from "./pages/ExchangePolicy";
import SupportPolicy from "./pages/SupportPolicy";

const App = () => {
  return (
    <div className="container">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
        <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact/*' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/returns-policy" element={<ReturnsPolicy/>}/>
        <Route path="/exchange-policy" element={<ExchangePolicy/>}/>
        <Route path="/support-policy" element={<SupportPolicy/>}/>
       
      </Routes>
      <Footer />
    </div>
  )
}


export default App;
