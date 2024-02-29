import ButtonMui from "@mui/material/Button"
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
      if (confirm("Do you want to Logout?")){
        dispatch(setLoggedOut())
        localStorage.removeItem("userToRememberLoggedIn")
        dispatch(setCart([]))
        dispatch(setQuantityCart(0))
        navigate("/mainPage")
      }
    }

    return (
        <Navbar className="bg-dark text-white position-relative">
        <h1 className="fw-bold my-2 ms-3 text-nowrap">The Book Club</h1>
        <Nav className="me-auto">
          { loginStatus ? 
          <>
            <div className="d-flex">
              <Nav.Link 
                className="text-light ms-4"
                onClick={() => navigate("/mainPage")}
              >
                  Home
              </Nav.Link>
              <Nav.Link 
                className="text-light ms-2" 
                onClick={() => navigate("/profilePage")}
              >
                  Profile
              </Nav.Link>
            </div>
            <ButtonMui 
              onClick={handleLogout}
              size="small" 
              className="position-absolute end-0 me-3 mt-1">
              Logout
            </ButtonMui>
          </>
          : 
          <>
            <Nav.Link 
              className="text-light ms-4" 
              onClick={() => navigate("/mainPage")}
              >
                Home
              </Nav.Link>
            <Nav.Link 
              className="text-light ms-2" 
              onClick={() => navigate("/loginPage")}
              >
                Log in
              </Nav.Link>
          </>
          }
        </Nav>
      </Navbar>
    )
}