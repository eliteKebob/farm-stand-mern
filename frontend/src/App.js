import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Landing from "./pages/Landing"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Order from "./pages/Order"
import SingleCategory from "./pages/SingleCategory"
import NewProduct from "./pages/NewProduct"
import SearchResults from "./pages/SearchResults"
import UserOrders from "./pages/UserOrders"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/user/:id/edit" element={<EditProfile />} />
          <Route path="/orders/:id" element={<UserOrders />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/categories/:category" element={<SingleCategory />} />
          <Route path="/sell-product" element={<NewProduct />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
