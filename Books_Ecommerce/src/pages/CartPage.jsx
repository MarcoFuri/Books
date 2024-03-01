import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"
import { removeItem, addItem } from "../reducers/modifyCartSlice"
import { decreaseQuantity, increaseQuantity } from "../reducers/cartQuantitySlice"
import { useEffect, useState } from "react"
import { clearQuantityCart } from "../reducers/cartQuantitySlice"
import { clearCart } from '../reducers/modifyCartSlice';
import { setCart } from "../reducers/modifyCartSlice"
import ButtonMui from "@mui/material/Button"

function CartPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const myCart = useSelector(state => state.cartItems)
    const loginStatus = useSelector(state => state.loginStatus)
    const userLogged = useSelector(state => state.userLogged)
    const cartCounter = useSelector(state => state.cartQuantity)

    const [cartWithProducts, setCartWithProducts] = useState(false)
    const [checkoutError, setCheckoutError] = useState(false)
    const [cartModified, setCartModified] = useState(false)

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
        } else {
          console.log(userLoggedCartStored)
          dispatch(setCart(userLoggedCartStored.cart))
        }
      }, [])

    useEffect(() => {
        if (myCart.length > 0) {
            setCartWithProducts(true)
        } else {
            setCartWithProducts(false)
        }
    }, [myCart])

    useEffect(() => {
        if (cartModified) {
            if (!loginStatus) {
                localStorage.setItem("unmatchedCart", JSON.stringify(myCart))
            } else {
                usersCartStored[userLoggedCartStoredIndex].cart = [...myCart]
                localStorage.setItem("usersCart", JSON.stringify(usersCartStored))
                setCartModified(false)
            }
        }
    }, [cartModified])

    let cartTotalPrice = 0

    const handleDecreaseQnt = (book) => {
        dispatch(removeItem(book))
        dispatch(decreaseQuantity())
        setCartModified(true)
    }

    const handleIncreaseQnt = (book) => {
        dispatch(addItem(book))
        dispatch(increaseQuantity())
        setCartModified(true)
    }

    const handleGoToCheckout = () => {
        if (!cartWithProducts) {
            setCheckoutError(true)
        } else {
            navigate("/paymentShippingPage")
        }
    }

    const handleClearCart = () => {
        if (cartCounter > 0) { // try to look for a way to change the label of the confirm
            if (confirm("Are you sure? All the products in your cart will be removed")) {
                dispatch(clearCart())
                dispatch(clearQuantityCart())
                localStorage.removeItem("usersCart")
            }
        }
    }

    return (
        <>
            <Container className="cartContainer my-4 pb-5">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <p 
                        className="yourCart fw-bold h2 mt-2"
                        >
                            YOUR CART
                    </p>
                    <div>
                        <ButtonMui 
                            onClick={() => navigate("/")}
                            className="buttonHover"
                            style={{ 
                                fontFamily: "Work Sans, sans-serif",
                                backgroundColor:"rgba(249, 246, 246, 0.7)",
                                color:"black"
                            }}
                            >
                            Go back
                        </ButtonMui>
                    </div>
                </div>
                {cartWithProducts ?
                    <Row className="pb-5">
                        {myCart.map((book, index) =>
                            <Col key={index} className="bg-light m-2 p-3 rounded border border-2 col-12 d-flex justify-content-between position-relative">
                                <div className="d-flex">
                                    <img
                                        className="me-4"
                                        style={{ width: "5rem" }}
                                        src={book.cover}
                                        alt="book cover" />
                                    <div>
                                        <p className="fw-bold m-0 me-4">{book.title}</p>
                                        <p className="fw-light lh-sm mb-2" style={{ fontSize: "0.85rem" }}>
                                            {book.author}
                                        </p>
                                        <p 
                                            className="h6 fw-light" 
                                            style={{ fontSize: "0.85rem", fontFamily: "Work Sans, sans-serif" }}
                                            >
                                            Published in: <span className="fw-normal">{book.year}</span>
                                        </p>
                                        {/* <p>x{book.quantity}</p> */}
                                    </div>
                                </div>
                                <p className="h5 fw-bold">
                                    {/* {book.price.toFixed(2)}$ */}
                                    <span className="d-none">
                                        {cartTotalPrice += (book.price * book.quantity)}
                                    </span>
                                </p>
                                <div className="position-absolute d-flex end-0 bottom-0 m-3">
                                    <ButtonMui
                                        onClick={() => handleDecreaseQnt(book)}
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        style={{ height: "1.5rem", minWidth: "1.5rem", width: "1.5rem", borderRadius: "15px 0 0 15px" }}
                                    >
                                        -
                                    </ButtonMui>
                                    <p
                                        className="fw-bold border border-1 text-center"
                                        style={{ width: "2.5rem", height: "1.5rem" }}
                                    >{book.quantity}</p>
                                    <ButtonMui
                                        onClick={() => handleIncreaseQnt(book)}
                                        variant="outlined"
                                        size="small"
                                        style={{ height: "1.5rem", minWidth: "1.5rem", width: "1.5rem", borderRadius: "0 15px 15px 0" }}
                                    >
                                        +
                                    </ButtonMui>
                                </div>

                            </Col>
                        )}
                    </Row>
                    :
                    <p 
                        className="h5 fw-normal"
                        style={{ fontFamily: "Work Sans, sans-serif" }}
                        >
                            Still nothing in your cart!
                    </p>
                }
                {checkoutError &&
                    <p className="h6 fw-light p-2 border border-1 border-danger rounded">Nothing to checkout, add some books first!</p>
                }

            </Container>
            <Container
                fluid
                className="position-fixed bottom-0 d-flex justify-content-between bg-light border px-5">
                <Row className="align-items-center">
                    <Col className="me-1 my-2 p-1 px-3 bg-dark text-white rounded">
                        <p className="m-0" style={{fontSize:"0.8rem"}}>TOTAL</p>
                        <p className="h4 m-0">{cartTotalPrice.toFixed(2)}$</p>
                    </Col>
                    <Col>
                        <ButtonMui
                            onClick={() => handleClearCart()}
                            className="buttonHover text-nowrap px-1"
                            variant="outlined"
                            color="error"
                            size="small"
                            style={{
                                fontFamily:"Work Sans, sans-serif",
                                backgroundColor:"rgba(249, 246, 246, 0.7)",
                                height:"1.5rem",
                                fontSize:"0.7rem"
                            }}
                        >
                            Clear cart
                        </ButtonMui>

                    </Col>
                </Row>
                {loginStatus ?
                    <Row>
                        <ButtonMui
                            onClick={handleGoToCheckout}
                            variant="outlined"
                            className="buttonHover my-3"
                            style={{
                                fontFamily:"Work Sans, sans-serif",
                                color:"black",
                                borderColor:"rgb(0,0,0,0.2)",
                                backgroundColor:"rgba(249, 246, 246, 0.7)"
                            }}
                            >
                            Go to checkout
                        </ButtonMui>
                    </Row>
                    :
                    <Row>
                        <ButtonMui
                            onClick={() => navigate("/loginPage")}
                            variant="outlined"
                            className="buttonHover my-3"
                            style={{
                                fontFamily:"Work Sans, sans-serif",
                                color:"black",
                                borderColor:"rgb(0,0,0,0.2)",
                                backgroundColor:"rgba(249, 246, 246, 0.7)"
                            }}
                            >
                            Login to checkout
                        </ButtonMui>
                    </Row>
                }
            </Container>
        </>
    )
}

export default CartPage