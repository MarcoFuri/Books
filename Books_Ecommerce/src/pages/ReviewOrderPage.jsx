import ButtonMui from "@mui/material/Button"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../reducers/modifyCartSlice"
import { useState } from "react"
import { clearQuantityCart } from "../reducers/cartQuantitySlice"

export default function ReviewOrderPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogged = useSelector(state => state.userLogged)
    const orderDetails = JSON.parse(localStorage.getItem("userShippingDetails"))
    const cardOrderDetails = JSON.parse(localStorage.getItem("cardOrderDetails"))

    const usersCartStored = JSON.parse(localStorage.getItem("usersCart"))
    const userLoggedCartStored = usersCartStored.find((el) => el.email === userLogged.email)
    const userLoggedCartStoredIndex = usersCartStored.findIndex((el) => el.email === userLogged.email)

    const emailUserLogged = userLogged.email

    const [orderConfirmed, setOrderConfirmed] = useState(false)

    const progressiveOrderNumberStored = parseInt(localStorage.getItem("progressiveOrderNumber"))

    const newOrder = {
        orderNumber: "",
        email: emailUserLogged,
        userCart: userLoggedCartStored,
        orderShippingDetails: orderDetails,
        cardDetails: cardOrderDetails
    }

    const handleCancelOrder = () => {
        if (confirm("Are you sure you want to cancel your order? You are going to lose your cart and order details")) {
            dispatch(clearCart())
            dispatch(clearQuantityCart())
            navigate("/mainPage")
        }
    }

    const handleConfirmOrder = () => {
        if (progressiveOrderNumberStored) {
            const progressiveOrderNumber = progressiveOrderNumberStored + 1
            newOrder.orderNumber = progressiveOrderNumber
            localStorage.setItem("progressiveOrderNumber", JSON.stringify(progressiveOrderNumber))
            setOrderConfirmed(true)
        } else {
            newOrder.orderNumber = 1
            localStorage.setItem("progressiveOrderNumber", "1")
            setOrderConfirmed(true)
        }

        const ordersConfirmed = localStorage.getItem("ordersConfirmed")
        if (ordersConfirmed) {
            const arrayOrdersConfirmed = JSON.parse(ordersConfirmed)
            arrayOrdersConfirmed.push(newOrder)
            localStorage.setItem("ordersConfirmed", JSON.stringify(arrayOrdersConfirmed))
        } else {
            localStorage.setItem("ordersConfirmed", JSON.stringify([newOrder]))
        }

        usersCartStored.splice(userLoggedCartStoredIndex, 1)
        localStorage.setItem("usersCart", JSON.stringify(usersCartStored))

        localStorage.removeItem("userShippingDetails")
        localStorage.removeItem("cardOrderDetails")

        dispatch(clearCart())
        dispatch(clearQuantityCart())

        setTimeout(() => {
            localStorage.removeItem("userShippingDetails")
            localStorage.removeItem("cardOrderDetails")
            navigate("/mainPage")
        }, 6000)
    }

    let totalExpenses = 0

    return (
        <>
            <Container className="pb-5 checkoutContainers">
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h1>Checkout</h1>
                    <div>
                        <ButtonMui
                            onClick={() => navigate("/paymentDetailsPage")}
                            className="me-3"
                            style={{
                                backgroundColor:"rgba(249, 246, 246, 0.7)",
                                color:"black"
                            }}
                            >
                            Go back
                        </ButtonMui>
                    </div>
                </div>

                <div className="my-3 d-flex flex-wrap">
                    <div className="d-flex align-items-center pb-2">
                        <span
                            className="rounded-circle me-2 border border-primary bg-primary"
                            style={{ padding: "2px 9px 2px 8px" }}
                        >
                            <svg
                                width={12}
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        </span>
                        <p className="m-0 p-0 text-nowrap">
                            Shipping details
                        </p>
                        <span className="mx-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span
                            className="rounded-circle me-2 border border-primary bg-primary"
                            style={{ padding: "2px 9px 2px 8px" }}
                        >
                            <svg
                                width={12}
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        </span>
                        <p className="m-0 p-0 text-nowrap">
                            Payment details
                        </p>
                        <span className="mx-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span 
                            className="paymentPhaseCircle rounded-circle border border-primary me-2 bg-primary text-light"
                            style={{padding:"2px 10px 2px 10px"}}
                            >
                            3
                        </span>
                        <p className="m-0 p-0 fw-bold text-nowrap">
                            Review your order
                        </p>
                    </div>
                </div>
                {orderConfirmed ?
                    <>
                        <p className="h2 mt-4">Thanks you for your purchase!</p>
                        <p className="fw-normal h5">Your order is on the way!</p>
                        <p className="fw-light mt-4">You will be redirected soon!</p>
                    </>
                    :
                    <>
                        <Row>
                            <p className="h3 mt-5 mb-4">Order summary</p>
                            <div className="my-3 d-flex justify-content-between">
                                <p className="h5">Title</p>
                                <p className="h5">Price</p>
                            </div>
                            {userLoggedCartStored.cart.map((book) =>
                                <Col key={book.id} className="col-12 d-flex justify-content-between">
                                    <div>
                                        <p className="my-1">{book.title}</p>
                                        <p className="fw-light">{book.author}</p>
                                    </div>
                                    <p className="my-1">{book.price.toFixed(2)}$ x {book.quantity}<span className="d-none">{totalExpenses += book.price * book.quantity}</span></p>
                                </Col>
                            )}
                            <div className="d-flex justify-content-between mt-4">
                                <p className="h4 fw-bold">Total</p>
                                <p className="h4 fw-bold">{totalExpenses.toFixed(2)}$</p>
                            </div>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                <p className="h5">Shipping address</p>
                                <p className="m-0">{orderDetails.address},</p>
                                <p className="m-0">{orderDetails.city} - {orderDetails.province} {orderDetails.zip}</p>
                                <p className="m-0">{orderDetails.country}</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <p className="h5">Payment details</p>
                            <Col className="col-6">
                                <p className="m-0"><span className="fw-light">Card name:</span> {cardOrderDetails.cardName}</p>
                                <p className="m-0"><span className="fw-light">Card number:</span> xxxx-xxxx-xxxx-{cardOrderDetails.cardNumber.substring(cardOrderDetails.cardNumber.length - 4)}</p>
                                <p className="m-0"><span className="fw-light">Expiration date: </span>
                                    {cardOrderDetails.expiryDateMonth < 10 ? "0" + cardOrderDetails.expiryDateMonth : cardOrderDetails.expiryDateMonth}/{cardOrderDetails.expiryDateYear}
                                </p>
                                <p className="m-0"><span className="fw-light">Purchase date: </span>{cardOrderDetails.purchaseDate}</p>
                            </Col>

                            {cardOrderDetails.orderPaymentAddress?.address &&
                                <Col>
                                    <p className="m-0">{cardOrderDetails.orderPaymentAddress.address}</p>
                                    <p className="m-0">{cardOrderDetails.orderPaymentAddress.city} - {cardOrderDetails.orderPaymentAddress.province} {cardOrderDetails.orderPaymentAddress.zip}</p>
                                    <p className="m-0">{cardOrderDetails.orderPaymentAddress.country}</p>
                                </Col>
                            }
                        </Row>
                        <ButtonMui
                            onClick={handleConfirmOrder}
                            variant="outlined"
                            className="buttonHover mt-4"
                            style={{
                                color:"black",
                                borderColor:"rgb(0,0,0,0.2)",
                                backgroundColor:"rgba(249, 246, 246, 0.5)",
                                height:"2.5rem",
                                width:"18rem"
                            }}
                        >
                            Confirm order
                        </ButtonMui>
                        <ButtonMui
                            onClick={handleCancelOrder}
                            variant="outlined"
                            size="small"
                            className="mt-4 ms-1 px-4"
                            color="error"
                            style={{
                                height:"2.5rem",
                                fontSize:"0.70rem"
                            }}
                        >
                            Cancel
                        </ButtonMui>
                    </>
                }
            </Container>

        </>
    )
}