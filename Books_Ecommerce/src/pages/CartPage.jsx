import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col, Navbar } from "react-bootstrap"
import { removeItem, addItem } from "../reducers/modifyCartSlice"
import { decreaseQuantity, increaseQuantity } from "../reducers/cartQuantitySlice"
import ButtonMui from "@mui/material/Button"
import Button from "react-bootstrap/Button"

function CartPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const myCart = useSelector(state => state.cartItems)
    let cartTotal = 0

    const handleRemove = (book) => {
        dispatch(removeItem(book))
    }

    const handleDecreaseQnt = (book) => {
        dispatch(removeItem(book))
        dispatch(decreaseQuantity())
    }

    const handleIncreaseQnt = (book) => {
        dispatch(addItem(book))
        dispatch(increaseQuantity())
    }

    return (
        <>
            <Navbar className="bg-dark text-white">
                <h1 className="fw-bold my-2 ms-3">The Book Club</h1>
            </Navbar>
            <div className="m-3 d-flex justify-content-between">
                <p className="yourCart fw-bold h4 mt-2">YOUR CART</p>
                <ButtonMui className="me-3" onClick={() => navigate("/")}>Go back</ButtonMui>
            </div>
            <Container className="mt-3">
                <Row>
                    {myCart.map((book) =>
                        <Col key={book.id} className="bg-light m-2 p-4 rounded border border-2 col-12 d-flex justify-content-between position-relative">
                            <div className="d-flex">
                                <img className="cartBookCover me-5" src={book.cover} alt="book cover" />
                                <div>
                                    <p className="fw-bold h5">{book.title}</p>
                                    <p className="h6 fw-light">{book.author}</p>
                                    <p className="h6 fw-light">Published in: <span className="fw-bold">{book.year}</span></p>
                                    <p>x{book.quantity}</p>
                                </div>
                            </div>
                            <p className="h4 fw-bold">{book.price.toFixed(2)}€<span className="d-none">{cartTotal += (book.price * book.quantity)}</span></p>
                            {book.quantity === 1 &&
                                <Button onClick={() => handleRemove(book)} variant="outline-danger" className="position-absolute end-0 bottom-0 m-3 btn-sm">

                                    <svg fill="currentColor" width={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                </Button>
                            }
                            {book.quantity > 1 && 
                                <div className="position-absolute d-flex end-0 bottom-0 m-3">
                                    <Button onClick={() => handleDecreaseQnt(book)} className="decreaseQntCart btn-sm"> _ </Button>
                                    <p className="pt-2 my-1 mx-2"> {book.quantity} </p>
                                    <Button onClick={() => handleIncreaseQnt(book)} className="increaseQntCart btn-sm"> + </Button>
                                </div>
                            }
                        </Col>
                    )}
                </Row>
            </Container>
            <Container fluid className="position-sticky bottom-0 d-flex justify-content-between bg-light border px-5">
                <Row className="me-5 my-2 p-2 bg-dark text-white rounded">
                    <p className="m-0">Total</p>
                    <p className="h4 m-0">{cartTotal.toFixed(2)}€</p>
                </Row>
                <Row className=" ">
                    <Button onClick={() => navigate("/paymentPage")} variant="primary" className="my-2 py-2 px-3 bottom-0 btn-sm">GO TO PAYMENT</Button>
                </Row>
            </Container>
        </>
    )
}

export default CartPage