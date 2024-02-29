import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonMui from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import CartIcon from "../assets/cart.svg"
import { Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { addItem, setCart } from "../reducers/modifyCartSlice"
import { increaseQuantity, setQuantityCart } from "../reducers/cartQuantitySlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TextField } from '@mui/material';


export default function MainPage() {
  // localStorage.removeItem("usersCart")
  // localStorage.removeItem("unmatchedCart")
  const booksAvailable = [
    { id: "id989283", title: "Harry Potter and the Philosopher's Stone", year: 1999, price: 11.9, author: "J.K.Rowling", cover: "https://www.lafeltrinelli.it/images/9788831003384_0_536_0_75.jpg" },
    { id: "id987364", title: "Harry Potter and the Chamber of Secrets", year: 2000, price: 11.9, author: "J.K.Rowling", cover: "https://bg.isbn.host4g.ru/images_isbn/9781408855669.jpg" },
    { id: "id983423", title: "Harry Potter and the Prisoner of Azkaban", year: 2001, price: 12.9, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id951523", title: "Harry Potter and the Goblet of Fire", year: 2003, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81BownMW+fL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id986787", title: "Harry Potter and the Order of the Phoenix", year: 2004, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/813lOXWdSNL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id967893", title: "Harry Potter and the Half-Blood Prince", year: 2007, price: 13.9, author: "J.K.Rowling", cover: "https://www.bokklubben.no/servlet/VisBildeServlet?produktId=10231124&width=600" },
    { id: "id989353", title: "Harry Potter and the Deathly Hallows", year: 2009, price: 13.9, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81W7uynFyWL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id989238", title: "Harry Potter and the Philosopher's Stone", year: 1999, price: 11.9, author: "J.K.Rowling", cover: "https://www.lafeltrinelli.it/images/9788831003384_0_536_0_75.jpg" },
    { id: "id217368", title: "Harry Potter and the Chamber of Secrets", year: 2000, price: 11.9, author: "J.K.Rowling", cover: "https://bg.isbn.host4g.ru/images_isbn/9781408855669.jpg" },
    { id: "id238971", title: "Harry Potter and the Prisoner of Azkaban", year: 2001, price: 12.9, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id732892", title: "Harry Potter and the Goblet of Fire", year: 2003, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81BownMW+fL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id912738", title: "Harry Potter and the Order of the Phoenix", year: 2004, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/813lOXWdSNL._AC_UF1000,1000_QL80_.jpg" },
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const myCart = useSelector(state => state.cartItems)
  const cartCounter = useSelector(state => state.cartQuantity)
  const userLogged = useSelector(state => state.userLogged)
  const loginStatus = useSelector(state => state.loginStatus)

  const [bookAdded, setBookAdded] = useState(false)

  // RenderCart()

  const unmatchedCartStored = localStorage.getItem("unmatchedCart") ?
    JSON.parse(localStorage.getItem("unmatchedCart")) : []

  const usersCartStored = localStorage.getItem("usersCart") ?
    JSON.parse(localStorage.getItem("usersCart")) : []

  const userLoggedCartStored = usersCartStored.find((el) => el.email === userLogged.email) !== undefined ?
    usersCartStored.find((el) => el.email === userLogged.email) : { email: userLogged.email, cart: [] }

  const userLoggedCartStoredIndex = usersCartStored.findIndex((el) => el.email === userLogged.email)

  useEffect(() => {
    if (!loginStatus) {
      dispatch(setCart(unmatchedCartStored))
      let unmatchedCartQuantity = 0
      unmatchedCartStored.forEach((el) => unmatchedCartQuantity += el.quantity)
      dispatch(setQuantityCart(unmatchedCartQuantity))
    } else {
      console.log(userLoggedCartStored)
      dispatch(setCart(userLoggedCartStored.cart))
      let userLoggedCartQuantity = 0
      userLoggedCartStored.cart.forEach((el) => userLoggedCartQuantity += el.quantity)
      dispatch(setQuantityCart(userLoggedCartQuantity))
    }
  }, [])


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
    if (loginStatus && userLoggedCartStoredIndex === -1){
      localStorage.setItem("usersCart", JSON.stringify([...usersCartStored, { ...userLoggedCartStored, cart: [book] }]))
    } else {
      setBookAdded(true)
    }
  }

  return (
    <>
      <Container
        fluid
        className="position-sticky top-0 border bg-light z-1">
        {loginStatus ?

          <Row className="d-flex justify-content-between">
            <p className="h6 fw-light m-2 pt-1 col-4">Logged in with: <br />
              <span className="h6 fw-normal"> {userLogged.email}</span>
            </p>
            <ButtonMui
              onClick={() => navigate("/cartPage/")}
              className="mx-4 my-3"
              variant="contained"
              size="small"
              style={{ padding: "6px", width: "9rem" }}
            >
              <img
                src={CartIcon}
                alt="cart icon"
                style={{ width: "14px" }}
                className="mx-1"
              />
              <p className="m-0 text-nowrap">
                Go to Cart
                <span className="border border-1 bg-dark rounded-pill p-1 px-2 ms-1">
                  {cartCounter}
                </span>
              </p>
            </ButtonMui>
          </Row>
          :
          <Row className="justify-content-end">
            <ButtonMui
              onClick={() => navigate("/cartPage/")}
              className="mx-4 my-3"
              variant="contained"
              size="small"
              style={{ padding: "6px", width: "9rem" }}
            >
              <img
                src={CartIcon}
                alt="cart icon"
                style={{ width: "14px" }}
                className="mx-1"
              />
              <p className="m-0 text-nowrap">
                Go to Cart
                <span className="border border-1 bg-dark rounded-pill p-1 px-2 ms-1">
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
            // onChange={(e) => setSearchInputValue(e.target.value)}
            placeholder="Search"
            size="small"
            fullWidth
          />
          <ButtonMui
            // onClick={handleSearch}
            // onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            variant="outlined"
            type="button"
            className="ms-1">
            Search
          </ButtonMui>
        </div>
      </Container>

      <Container className="mt-1">
        <Row className="justify-content-evenly pb-4">
          {booksAvailable.map((book) =>
            <Col key={book.id} className="col-6 col-md-4 col-lg-3 my-3">
              <Card className="card">
                <CardMedia
                  sx={{ height: 180, width: 110, margin: "auto" }}
                  image={book.cover}
                  title={book.title}
                  className="mt-3"
                />
                <CardContent className="cardContent pb-1">
                  <Typography
                    className="lh-sm fw-bold"
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    className="fw-light lh-sm mt-1"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {book.author} - {book.year}
                  </Typography>
                  <Typography
                    className="fw-normal lh-sm mt-3"
                  >
                    {book.price.toFixed(2)}$
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonMui
                    onClick={() => handleAddToCart(book)}
                    variant="outlined"
                    size="small"
                    style={{ fontSize: "0.75rem" }}>
                    Add to Cart
                  </ButtonMui>
                </CardActions>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
