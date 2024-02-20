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
import { Navbar, Nav } from 'react-bootstrap'
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'

function App() {

  const loginStatus = useSelector(state => state.loginStatus)

  return (
    <>
      <Navbar className="bg-dark text-white">
        <h1 className="fw-bold my-2 ms-3 text-nowrap">The Book Club</h1>
        <Nav className="me-auto">
          { loginStatus ? 
          <>
            <Nav.Link className="text-light ms-3" href="/loginPage">Home</Nav.Link>
            <Nav.Link className="text-light ms-3" href="/loginPage">Profile</Nav.Link>
          </>
          : 
          <>
            <Nav.Link className="text-light ms-3" href="/loginPage">Home</Nav.Link>
            <Nav.Link className="text-light ms-3" href="/loginPage">Log in</Nav.Link>
          </>
          }
        </Nav>
      </Navbar>
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
