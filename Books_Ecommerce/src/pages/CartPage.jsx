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
                <ButtonMui
                    onClick={() => navigate("/")}
                    className="me-3">
                    Go back
                </ButtonMui>
            </div>
            <Container className="mt-3 pb-5">
                <Row className="pb-5">
                    {myCart.map((book) =>
                        <Col key={book.id} className="bg-light m-2 p-4 rounded border border-2 col-12 d-flex justify-content-between position-relative">
                            <div className="d-flex">
                                <img
                                    className="cartBookCover me-5"
                                    src={book.cover}
                                    alt="book cover" />
                                <div>
                                    <p className="fw-bold h5">{book.title}</p>
                                    <p className="h6 fw-light">{book.author}</p>
                                    <p className="h6 fw-light">Published in: <span className="fw-bold">{book.year}</span></p>
                                    <p>x{book.quantity}</p>
                                </div>
                            </div>
                            <p className="h4 fw-bold">
                                {book.price.toFixed(2)}€
                                <span className="d-none">
                                    {cartTotal += (book.price * book.quantity)}
                                </span>
                            </p>
                            <div className="position-absolute d-flex end-0 bottom-0 m-3">
                                <Button
                                    onClick={() => handleDecreaseQnt(book)}
                                    variant="outline-danger"
                                    className="decreaseQntCart btn-sm">
                                    _
                                </Button>
                                <p className="pt-2 mx-2">{book.quantity}</p>
                                <Button
                                    onClick={() => handleIncreaseQnt(book)}
                                    variant="outline-success"
                                    className="increaseQntCart btn-sm">
                                    +
                                </Button>
                            </div>

                        </Col>
                    )}
                </Row>
            </Container>
            <Container
                fluid
                className="position-fixed bottom-0 d-flex justify-content-between bg-light border px-5">
                <Row className="me-5 my-2 p-2 bg-dark text-white rounded">
                    <p className="m-0">Total</p>
                    <p className="h4 m-0">{cartTotal.toFixed(2)}€</p>
                </Row>
                <Row>
                    <Button
                        onClick={() => navigate("/paymentShippingPage")}
                        variant="primary"
                        className="my-2 px-3 bottom-0 btn-sm">
                        GO TO PAYMENT
                    </Button>
                </Row>
            </Container>
        </>
    )
}

export default CartPage