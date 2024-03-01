import ButtonMui from "@mui/material/Button"
import booksLogo from "../assets/booksLogo.png"
import { Navbar, Nav } from "react-bootstrap"
import { useSelector } from 'react-redux'
import { setLoggedOut } from "../reducers/loginStatusSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoggedIn } from '../reducers/loginStatusSlice';
import { setUserLogged } from '../reducers/userLoggedSlice';
import { setCart } from "../reducers/modifyCartSlice"
import { setQuantityCart } from "../reducers/cartQuantitySlice"

export default function MyNavbar() {

  const loginStatus = useSelector(state => state.loginStatus)
  const userToRememberLoggedIn = localStorage.getItem("userToRememberLoggedIn")


  const dispatch = useDispatch()
  const navigate = useNavigate()


  if (userToRememberLoggedIn) {
    if (!loginStatus) {
      dispatch(setLoggedIn())
      dispatch(setUserLogged(JSON.parse(userToRememberLoggedIn)))
    }
  }

  const handleLogout = () => {
    if (confirm("Do you want to Logout?")) {
      dispatch(setLoggedOut())
      localStorage.removeItem("userToRememberLoggedIn")
      dispatch(setCart([]))
      dispatch(setQuantityCart())
      navigate("/mainPage")
    }
  }

  return (
    <Navbar className="bg-dark text-white justify-content-between p-0">
      <div className="d-flex align-items-center">
        <img 
          src={booksLogo} 
          alt="books logo" 
          style={{width:"120px"}}
          />
        <h1
          className="fw-bold text-nowrap"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          THE BOOK CLUB
        </h1>
      </div>
      <Nav
        style={{ fontFamily: "Anton, sans-serif" }}
      >
        {loginStatus ?
          <>
            <div className="d-flex gap-2">
              <Nav.Link
                className="text-light"
                onClick={() => navigate("/mainPage")}
              >
                HOME
              </Nav.Link>
              <Nav.Link
                className="text-light"
                onClick={() => navigate("/profilePage")}
              >
                PROFILE
              </Nav.Link>
              <Nav.Link
                className="text-light"
                onClick={() => navigate("/ordersPage")}
              >
                ORDERS
              </Nav.Link>
            <ButtonMui
              onClick={handleLogout}
              size="small"
              className="ms-4 me-3"
              style={{ fontFamily: "Anton, sans-serif", color: "brown" }}
              >
              LOGOUT
            </ButtonMui>
              </div>
          </>
          :
          <>
            <div className="d-flex gap-2 me-4">
              <Nav.Link
                className="text-light"
                onClick={() => navigate("/mainPage")}
              >
                HOME
              </Nav.Link>
              <Nav.Link
                className="text-light"
                onClick={() => navigate("/loginPage")}
              >
                LOG IN
              </Nav.Link>
            </div>
          </>
        }
      </Nav>
    </Navbar>
  )
}