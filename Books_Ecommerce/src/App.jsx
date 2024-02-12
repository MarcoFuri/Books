import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from "./pages/MainPage"
import CartPage from './pages/CartPage'
import PaymentPage from './pages/PaymentPage'
import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/cartPage" element={<CartPage />}/>
        <Route path="/paymentPage" element={<PaymentPage />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
