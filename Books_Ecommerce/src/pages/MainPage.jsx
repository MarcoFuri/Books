import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonMui from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import CartIcon from "../assets/cart.svg"
import booksLogo from "../assets/booksLogo.png"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import { useState, useEffect } from "react"
import { addItem, setCart } from "../reducers/modifyCartSlice"
import { increaseQuantity, setQuantityCart } from "../reducers/cartQuantitySlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TextField } from '@mui/material';


export default function MainPage() {

  const PAGE_STATE = {
    INITIAL_STATE: "INITIAL_STATE",
    SEARCH_ERROR: "SEARCH_ERROR",
    SEARCH_SUCCESS: "SEARCH_SUCCESS",
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const myCart = useSelector(state => state.cartItems)
  const cartCounter = useSelector(state => state.cartQuantity)
  const userLogged = useSelector(state => state.userLogged)
  const loginStatus = useSelector(state => state.loginStatus)

  const [pageState, setPageState] = useState(PAGE_STATE.INITIAL_STATE)
  const [bookAdded, setBookAdded] = useState(false)
  const [booksFetched, setBooksFetched] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchingData, setSearchingData] = useState("")
  const [booksSearched, setBooksSearched] = useState(null)

  const unmatchedCartStored = localStorage.getItem("unmatchedCart") ?
    JSON.parse(localStorage.getItem("unmatchedCart")) : []

  const usersCartStored = localStorage.getItem("usersCart") ?
    JSON.parse(localStorage.getItem("usersCart")) : []

  const userLoggedCartStored = usersCartStored.find((el) => el.email === userLogged.email) !== undefined ?
    usersCartStored.find((el) => el.email === userLogged.email) : { email: userLogged.email, cart: [] }

  const userLoggedCartStoredIndex = usersCartStored.findIndex((el) => el.email === userLogged.email)

  useEffect(() => {
    if (!loginStatus) {
      let unmatchedCartQuantity = 0
      unmatchedCartStored.forEach((el) => unmatchedCartQuantity += el.quantity)
      dispatch(setCart(unmatchedCartStored))
      dispatch(setQuantityCart(unmatchedCartQuantity))
    } else {
      console.log(userLoggedCartStored)
      let userLoggedCartQuantity = 0
      userLoggedCartStored.cart.forEach((el) => userLoggedCartQuantity += el.quantity)
      dispatch(setCart(userLoggedCartStored.cart))
      dispatch(setQuantityCart(userLoggedCartQuantity))
    }
  }, [])

  useEffect(() => {
    fetch("http://localhost:5050/books")
      .then((res) => res.json())
      .then((data) => {
        setBooksFetched(data)
        setTimeout(() => {
          setLoading(true)
        }, 1000)
      })
  }, [])

  const querySearch = () => {
    if (searchingData === "") {
      setPageState(PAGE_STATE.SEARCH_ERROR)
    } else {
      fetch("http://localhost:5050/books/" + searchingData)
        .then((res) => res.json())
        .then((data) => {
          if (data.length <= 0) {
            setPageState(PAGE_STATE.SEARCH_ERROR)
          } else {
            setBooksSearched(data)
            setPageState(PAGE_STATE.SEARCH_SUCCESS)
          }
        })
    }
  }

  useEffect(() => {
    if (bookAdded) {
      if (!loginStatus) {
        localStorage.setItem("unmatchedCart", JSON.stringify(myCart))
      } else {
        if (userLoggedCartStoredIndex !== -1) {
          usersCartStored[userLoggedCartStoredIndex].cart = [...myCart]
          localStorage.setItem("usersCart", JSON.stringify(usersCartStored))
          setBookAdded(false)
        }
      }
    }
  }, [dispatch, myCart, bookAdded])

  const handleAddToCart = (book) => {
    dispatch(increaseQuantity())
    dispatch(addItem(book))
    if (loginStatus && userLoggedCartStoredIndex === -1) {
      localStorage.setItem("usersCart", JSON.stringify([...usersCartStored, { ...userLoggedCartStored, cart: [book] }]))
    } else {
      setBookAdded(true)
    }
  }

  const buttonColors = {
    backgroundColor: "rgba(249, 246, 246, 0.7)",
    borderColor: "rgba(0, 0, 0, 0.2)",
    color: "black"
  }

  return (
    <>
      <Container
        fluid
        className="position-sticky top-0 border bg-light z-2">
        {loginStatus ?

          <Row className="d-flex justify-content-between">
            <p
              className="h6 fw-light mt-3 col-4"
              style={{ fontSize: "0.8rem" }}
            >
              LOGGED IN WITH: <br />
              <span className="h6 fw-normal"> {userLogged.email}</span>
            </p>
            <ButtonMui
              onClick={() => navigate("/cartPage/")}
              className="buttonHover mx-4 my-3"
              variant="outlined"
              size="small"
              style={{
                padding: "6px",
                width: "9rem",
                ...buttonColors
              }}
            >
              <img
                src={CartIcon}
                alt="cart icon"
                style={{ width: "14px" }}
                className="mx-1"
              />
              <p
                className="m-0 text-nowrap text-dark"
                style={{ fontFamily: "Work Sans, sans-serif" }}
              >
                Go to Cart
                <span
                  className="border border-1 bg-dark text-white rounded-circle ms-1"
                  style={{ padding: "4px 8px 4px 8px" }}
                >
                  {cartCounter}
                </span>
              </p>
            </ButtonMui>
          </Row>
          :
          <Row className="justify-content-end">
            <ButtonMui
              onClick={() => navigate("/cartPage/")}
              className="buttonHover mx-4 my-3"
              variant="outlined"
              size="small"
              style={{
                padding: "6px",
                width: "9rem",
                ...buttonColors
              }}
            >
              <img
                src={CartIcon}
                alt="cart icon"
                style={{ width: "14px" }}
                className="mx-1"
              />
              <p
                className="m-0 text-nowrap"
                style={{ fontFamily: "Work Sans, sans-serif", letterSpacing: "rem" }}
              >
                Go to Cart
                <span className="border border-1 bg-dark text-white rounded-pill p-1 px-2 ms-1">
                  {cartCounter}
                </span>
              </p>
            </ButtonMui>
          </Row>
        }
      </Container>
      <Container>

        <div className="d-flex align-items-center mt-3">
          <TextField
            onChange={(e) => setSearchingData(e.target.value)}
            placeholder="Search"
            size="small"
            fullWidth
            InputProps={{
              style: {
                fontFamily: "Work Sans, sans-serif",
                height: "2.2rem",
                borderRadius: "4px 0 0 4px"
              }
            }}
          />
          <ButtonMui
            onClick={querySearch}
            variant="outlined"
            className="buttonHover"
            type="button"
            size="small"
            style={{
              fontFamily: "Work Sans, sans-serif",
              height: "2.2rem",
              borderRadius: "0 4px 4px 0",
              borderLeft: 0,
              ...buttonColors
            }}
          >
            Search
          </ButtonMui>
        </div>
      </Container>

      {!loading &&

        <div className="text-center mt-5">
          <Spinner
            animation="border"
            variant="dark"
            role="status">
          </Spinner>
        </div>
      }

      {pageState === PAGE_STATE.INITIAL_STATE && loading &&
        <>
          <Container fluid className="bg-light mt-3">
            <Row
              style={{ height: "25rem" }}
              className="d-flex"
            >
              <div className="col-6 d-flex flex-column">
                <Col className="col-8 h2 pt-4 ps-5 m-0 z-1" style={{ height: "6rem" }}>REDISCOVER YOUR PASSION FOR <span className="fw-bold">BOOKS</span></Col>
                <Col>
                  <img
                    src={booksLogo}
                    className="mt-3 ms-"
                    alt="logo"
                    style={{ width: "300px", }}
                  />
                </Col>
              </div>
              <div className="col-5 mt-5">
                <Col className="mb-4 ms-2 ps-1">
                  Find your next <span className="fw-bold">favorite</span> generation of <span className="fw-bold">inpiring</span> people.
                </Col>
                <Col className="ms-2">
                  <img src={booksFetched[0]?.coverImg} style={{ width: "125px", height: "180px" }} className="ms-2 mt-4" alt="" />
                  <img src={booksFetched[1]?.coverImg} style={{ width: "125px", height: "180px" }} className="ms-2 mt-4" alt="" />
                  <img src={booksFetched[2]?.coverImg} style={{ width: "125px", height: "180px" }} className="ms-2 mt-4" alt="" />
                </Col>
              </div>
            </Row>
          </Container>

          <Container className="mt-1">
            <Row className="justify-content-evenly pb-4">
              {booksFetched.map((book, index) =>
                <Col key={index} className="col-6 col-md-4 col-lg-3 my-3">
                  <Card
                    className="position-relative"
                    style={{
                      height: "100%",
                      backgroundColor: "#fcfcfc"
                    }}
                  >
                    <CardMedia
                      image={book.coverImg}
                      title={book.title}
                      className="mt-3 mx-auto"
                      style={{
                        height: "180px",
                        width: "120px"
                      }}
                    />
                    <CardContent className="cardContent pb-1">
                      <Typography
                        className="lh-sm fw-bold"
                        style={{ fontFamily: "Work Sans, sans-serif" }}
                      >
                        {book.title}
                      </Typography>
                      <Typography
                        className="fw-light lh-sm mt-1"
                        style={{ fontSize: "0.9rem", fontFamily: "Work Sans, sans-serif" }}
                      >
                        {book.author} - {book.publishedYear}
                      </Typography>
                      <Typography
                        className="fw-normal lh-sm mt-3"
                        style={{ fontSize: "0.9rem", fontFamily: "Work Sans, sans-serif" }}
                      >
                        {Number(book.price).toFixed(2)}$
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ButtonMui
                        onClick={() => handleAddToCart(book)}
                        className="buttonHover position-absolute bottom-0 end-0 mb-2 me-2"
                        variant="outlined"
                        size="small"
                        style={{
                          fontFamily: "Work Sans, sans-serif",
                          ...buttonColors,
                          backgroundColor: "#f5fafb"
                        }}
                      >
                        Add to Cart
                      </ButtonMui>
                    </CardActions>
                  </Card>
                </Col>
              )}
            </Row>
          </Container>
        </>
      }

      {pageState === PAGE_STATE.SEARCH_ERROR &&
        <p
          className="mt-4 ms-5 ps-5"
          style={{
            fontFamily: "Work Sans, sans-serif",
            fontWeight: "500"
          }}
        >Your <span className="fw-bold">research</span> has found <span className="fw-bold">no matches!</span> Please try again!
        </p>
      }
      {pageState === PAGE_STATE.SEARCH_SUCCESS &&
        <Container className="mt-1">
          <Row className="justify-content-evenly pb-4">
            {booksSearched?.map((book, index) =>
              <Col key={index} className="col-6 col-md-4 col-lg-3 my-3">
                <Card
                  className="position-relative"
                  style={{
                    height: "100%",
                    backgroundColor: "#fcfcfc"
                  }}
                >
                  <CardMedia
                    image={book.coverImg}
                    title={book.title}
                    className="mt-3 mx-auto"
                    style={{
                      height: "180px",
                      width: "120px"
                    }}
                  />
                  <CardContent className="cardContent pb-1">
                    <Typography
                      className="lh-sm fw-bold"
                      style={{ fontFamily: "Work Sans, sans-serif" }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      className="fw-light lh-sm mt-1"
                      style={{ fontSize: "0.9rem", fontFamily: "Work Sans, sans-serif" }}
                    >
                      {book.author} - {book.publishedYear}
                    </Typography>
                    <Typography
                      className="fw-normal lh-sm mt-3"
                      style={{ fontSize: "0.9rem", fontFamily: "Work Sans, sans-serif" }}
                    >
                      {Number(book.price).toFixed(2)}$
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ButtonMui
                      onClick={() => handleAddToCart(book)}
                      className="buttonHover position-absolute bottom-0 end-0 mb-2 me-2"
                      variant="outlined"
                      size="small"
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        ...buttonColors,
                        backgroundColor: "#f5fafb"
                      }}
                    >
                      Add to Cart
                    </ButtonMui>
                  </CardActions>
                </Card>
              </Col>
            )}

          </Row>
        </Container>
      }
    </>
  );
}
