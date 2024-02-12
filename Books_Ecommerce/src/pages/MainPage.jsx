import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonBts from 'react-bootstrap/Button';
import ButtonMui from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import { Nav, Navbar, Container, Form, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { replaceQueryValue } from '../reducers/querySearchSlice';
import { addItem } from "../reducers/modifyCartSlice"
import { increaseQuantity } from "../reducers/cartQuantitySlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function MainPage() {

  const booksAvailable = [
    { id: "id989283", title: "Harry Potter and the Philosopher's Stone.", year: 1999, price: 11.9, author: "J.K.Rowling", cover: "https://www.lafeltrinelli.it/images/9788831003384_0_536_0_75.jpg" },
    { id: "id987364", title: "Harry Potter and the Chamber of Secrets.", year: 2000, price: 11.9, author: "J.K.Rowling", cover: "https://bg.isbn.host4g.ru/images_isbn/9781408855669.jpg" },
    { id: "id983423", title: "Harry Potter and the Prisoner of Azkaban.", year: 2001, price: 12.9, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id951523", title: "Harry Potter and the Goblet of Fire.", year: 2003, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81BownMW+fL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id986787", title: "Harry Potter and the Order of the Phoenix.", year: 2004, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/813lOXWdSNL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id967893", title: "Harry Potter and the Half-Blood Prince.", year: 2007, price: 13.9, author: "J.K.Rowling", cover: "https://www.bokklubben.no/servlet/VisBildeServlet?produktId=10231124&width=600" },
    { id: "id989353", title: "Harry Potter and the Deathly Hallows.", year: 2009, price: 13.9, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81W7uynFyWL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id989238", title: "Harry Potter and the Philosopher's Stone.", year: 1999, price: 11.9, author: "J.K.Rowling", cover: "https://www.lafeltrinelli.it/images/9788831003384_0_536_0_75.jpg" },
    { id: "id217368", title: "Harry Potter and the Chamber of Secrets.", year: 2000, price: 11.9, author: "J.K.Rowling", cover: "https://bg.isbn.host4g.ru/images_isbn/9781408855669.jpg" },
    { id: "id238971", title: "Harry Potter and the Prisoner of Azkaban.", year: 2001, price: 12.9, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id732892", title: "Harry Potter and the Goblet of Fire.", year: 2003, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/81BownMW+fL._AC_UF1000,1000_QL80_.jpg" },
    { id: "id912738", title: "Harry Potter and the Order of the Phoenix.", year: 2004, price: 12.5, author: "J.K.Rowling", cover: "https://m.media-amazon.com/images/I/813lOXWdSNL._AC_UF1000,1000_QL80_.jpg" },
  ]

  const [searchInputValue, setSearchInputValue] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // const [cartCounter, setCartCounter] = useState(0)

  const query = useSelector(state => state.querySearch)
  const myCart = useSelector(state => state.cartItems)
  const cartCounter = useSelector(state => state.cartQuantity)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    console.log("your search input is:", searchInputValue)
  }, [searchInputValue])

  const handleAddToCart = (book) => {
    dispatch(increaseQuantity())
    console.log("added to your cart!")
    dispatch(addItem(book))
    console.log(myCart)
  }

  const handleSearch = () => {
    setSearchQuery(searchInputValue)
    dispatch(replaceQueryValue(searchQuery))
    // fetch with seachQuery
  }


  return (
    <>
      <Navbar className="bg-dark text-white">
          <h1 className="fw-bold my-2 ms-3 text-nowrap">The Book Club</h1>
        <Container>
          <Nav className="me-auto">
            {/* <Nav.Link className="text-white ms-4" href="#">Home</Nav.Link> */}
            {/* <Nav.Link className="text-white ms-4" href="#">Link</Nav.Link> */}
          </Nav>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control onChange={(e) => setSearchInputValue(e.target.value)} type="text" placeholder="Search" className="border border-0 " />
              </Col>
              <Col>
                <ButtonBts onClick={handleSearch} variant="outline-secondary" type="button">Search</ButtonBts>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>

      {/* <Container fluid className="p-0 text-center mt-4 position-relative">
      <div className="headerMainPage">
       <img className="headerLogo position-absolute" src={booksLogo} alt="" />
      </div>
    </Container> */}
      <div className="position-sticky top-0">
        <ButtonMui onClick={() => navigate("/cartPage/")} className="ms-3 mt-3 end-0" variant="contained">
          <svg className="me-2" xmlns="http://www.w3.org/2000/svg" fill="#ebebeb" width="22px" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
          <p className="m-0 p-0">Go to Cart <span className="border border-1 bg-dark rounded-pill p-1 px-2 ms-1">{cartCounter}</span></p>
        </ButtonMui>
      </div>

      <Container className="mt-1">
        <Row className="justify-content-evenly">
          {booksAvailable.map((book) =>
            <Col key={book.id} className="col-6 col-md-4 col-lg-3 my-3">
              <Card>
                <CardMedia
                  sx={{ height: 250, width: 150, margin: "auto" }}
                  image={book.cover}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.price.toFixed(2)}€
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author} - {book.year}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonMui onClick={() => handleAddToCart(book)} size="small">Add to Cart</ButtonMui>
                </CardActions>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
