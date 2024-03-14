import ButtonMui from "@mui/material/Button"
import booksLogo from "../assets/booksLogo.png"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from "react";
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

  const [open, setOpen] = useState(false);

  if (userToRememberLoggedIn) {
    if (!loginStatus) {
      dispatch(setLoggedIn())
      dispatch(setUserLogged(JSON.parse(userToRememberLoggedIn)))
    }
  }

  const handleLogout = () => {
    dispatch(setLoggedOut())
    localStorage.removeItem("userToRememberLoggedIn")
    dispatch(setCart([]))
    dispatch(setQuantityCart(0))
    navigate("/mainPage")
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Navbar className="bg-dark text-white justify-content-between p-0">
      <div className="d-flex align-items-center">
        <img
          src={booksLogo}
          alt="books logo"
          style={{ width: "120px" }}
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
                onClick={() => handleClickOpen()}
                size="small"
                className="ms-2 me-3"
                style={{
                  fontFamily: "Anton, sans-serif",
                  color: "brown"
                }}
              >
                Logout
              </ButtonMui>
              {open &&
              <Dialog
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent className="bg-dark">
                  <DialogContentText 
                    className="fw-normal m-0 pb-0 text-light"
                    style={{
                      fontFamily: "Work Sans, sans-serif"
                    }}
                    >
                    Do you want to logout?
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="bg-dark">
                  <ButtonMui
                    onClick={() => handleClose()}
                    variant="outlined"
                    className="mb-2"
                    size="small"
                    style={{
                      color: "#ebebeb",
                      borderColor: "rgb(255,255,255,0.2)",
                      padding:"2px 6px 2px 6px"
                    }}
                  >
                    Cancel
                  </ButtonMui>
                  <ButtonMui
                    onClick={() => handleLogout()}
                    autoFocus
                    variant="outlined"
                    className="me-3 mb-2"
                    size="small"
                    color="error"
                    style={{
                      padding:"2px 6px 2px 6px"
                    }}
                  >
                    Yes
                  </ButtonMui>
                </DialogActions>
              </Dialog>
}
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