import ButtonMui from "@mui/material/Button"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


export default function ReviewOrderPage() {

    const navigate = useNavigate()
    const myCart = useSelector(state => state.cartItems)
    const orderDetails = useSelector(state => state.orderDetails)
    console.log(orderDetails)

    const paymentAddress = orderDetails.orderPaymentAddress

    let totalExpenses = 0

    return (
        <>
            <Container className="pb-5 checkoutContainers">
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h1>Checkout</h1>
                    <div>
                        <ButtonMui
                            onClick={() => navigate("/paymentDetailsPage")}
                            className="me-3">
                            Go back
                        </ButtonMui>
                    </div>
                </div>

                <div className="my-3 d-flex flex-wrap">
                    <div className="d-flex align-items-center pb-2">
                        <span className="paymentPhaseCircle rounded-circle me-2 border border-primary bg-primary">
                            <svg
                                width={8}
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        </span>
                        <p className="m-0 p-0 text-nowrap">
                            Shipping details
                        </p>
                        <span className="ms-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span className="paymentPhaseCircle rounded-circle border border-primary mx-2 bg-primary text-light">
                            <svg
                                width={8}
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        </span>
                        <p className="m-0 p-0 text-nowrap">
                            Payment details
                        </p>
                        <span className="ms-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span className="paymentPhaseCircle rounded-circle border border-primary me-2 bg-primary text-light">
                            3
                        </span>
                        <p className="m-0 p-0 fw-bold text-nowrap">
                            Review your order
                        </p>
                    </div>
                </div>
                <Row>
                    <p className="h3 mt-5 mb-4">Order summary</p>
                    <div className="my-3 d-flex justify-content-between">
                        <p className="h5">Title</p>
                        <p className="h5">Price</p>
                    </div>
                    {myCart.map((book) =>
                        <Col key={book.id} className="col-12 d-flex justify-content-between">
                            <div>
                                <p className="my-1">{book.title}</p>
                                <p className="fw-light">{book.author}</p>
                            </div>
                            <p className="my-1">{book.price.toFixed(2)}€ x {book.quantity}<span className="d-none">{totalExpenses += book.price * book.quantity}</span></p>
                        </Col>
                    )}
                    <div className="d-flex justify-content-between mt-4">
                        <p className="h4 fw-bold">Total</p>
                        <p className="h4 fw-bold">{totalExpenses.toFixed(2)}€</p>
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
                        <p className="m-0"><span className="fw-light">Card name:</span> {orderDetails.name} {orderDetails.lastName}</p>
                        <p className="m-0"><span className="fw-light">Card number:</span> xxxx-xxxx-xxxx-{orderDetails.lastName}</p>
                        <p className="m-0"><span className="fw-light">Expiration date:</span> {orderDetails.name} {orderDetails.lastName}</p>

                    </Col>

                    {orderDetails.address !== paymentAddress &&
                        <Col>
                            <p className="m-0">{paymentAddress.address}</p>
                            <p className="m-0">{paymentAddress.city} - {paymentAddress.province} {paymentAddress.zip}</p>
                            <p className="m-0">{paymentAddress.country}</p>
                        </Col>
                    }
                </Row>

            </Container>

        </>
    )
}