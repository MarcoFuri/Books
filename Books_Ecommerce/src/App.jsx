import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from "./pages/MainPage"
import CartPage from './pages/CartPage'
import PaymentShippingPage from './pages/PaymentShippingPage'
import PaymentDetailsPage from "./pages/PaymentDetailsPage"
import ReviewOrderPage from "./pages/ReviewOrderPage"
import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/cartPage" element={<CartPage />}/>
        <Route path="/paymentShippingPage" element={<PaymentShippingPage />}/>
        <Route path="/paymentDetailsPage" element={<PaymentDetailsPage />}/>
        <Route path="/reviewOrderPage" element={<ReviewOrderPage />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
