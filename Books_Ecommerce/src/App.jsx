import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from "./pages/MainPage"
import CartPage from './pages/CartPage'
import PaymentShippingPage from './pages/PaymentShippingPage'
import PaymentDetailsPage from "./pages/PaymentDetailsPage"
import ReviewOrderPage from "./pages/ReviewOrderPage"
import ProfilePage from './pages/ProfilePage'
import LoginPage from "./pages/LoginPage"
import SignUpPage from './pages/SignUpPage'
import MyNavbar from './components/MyNavbar'
import { Routes, Route, Navigate } from "react-router-dom"

function App() {

  return (
    <>
      <MyNavbar/>
      <Routes>
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/paymentShippingPage" element={<PaymentShippingPage />} />
        <Route path="/paymentDetailsPage" element={<PaymentDetailsPage />} />
        <Route path="/reviewOrderPage" element={<ReviewOrderPage />} />
        <Route path="*" element={<Navigate to="/mainPage" />} />
      </Routes>
    </>
  )
}

export default App
