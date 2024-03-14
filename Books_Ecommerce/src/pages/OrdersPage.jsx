import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProfilePage() {

    const navigate = useNavigate()

    const userLogged = useSelector(state => state.userLogged)
    const ordersConfirmed = JSON.parse(localStorage.getItem("ordersConfirmed"))

    const [userOrders, setUserOrders] = useState(false)

    let userLoggedOrders = []

    if (userLogged.admin) {
        userLoggedOrders = ordersConfirmed
    } else {
        ordersConfirmed.forEach((el) => {
            if (el.email === userLogged.email) {
                userLoggedOrders.push(el)
            }
        })
    }

    useEffect(() => {
        if (!userLoggedOrders.length > 0) {
            setUserOrders(false)
        } else {
            setUserOrders(true)
        }
    }, [])

    console.log(userLoggedOrders)

    return (
        <>
            <Container style={{
                width: "90vw",
                maxWidth: "50rem"
            }}>
                <p className="h2 mt-4 fw-bold">YOUR ORDERS</p>
                <Row className="my-3 gap-2">
                    {userOrders ? 
                        userLoggedOrders.map((order, index) =>
                        <Col
                            onClick={() => navigate("/detailOrderPage")}
                            key={index}
                            className="col-12 d-flex bg-light border border-1 rounded justify-content-between"
                            style={{
                                height: "7rem",
                                color: "black",
                                backgroundColor: "black"
                            }}
                        >
                            <p className="d-flex mt-3 pt-1 ms-4">
                                <img
                                    src={order.userCart.cart[0].cover}
                                    alt="book cover"
                                    className="me-2"
                                    style={{
                                        width: "40px",
                                        height: "65px"
                                    }}
                                />
                                <div>
                                    <p
                                        className="fw-normal d-flex flex-column me-1"
                                        style={{
                                            fontSize: "0.8rem",
                                            letterSpacing: "-0.08em"
                                        }}
                                    >
                                        {order.userCart.cart[0].title}
                                        <span 
                                            className="fw-light"
                                            style={{fontSize:"0.7rem"}}
                                            >
                                                {order.userCart.cart[0].author}</span>
                                    </p>
                                    {order.userCart.cart[1] &&
                                    <p
                                        style={{
                                            fontSize:"0.75rem",
                                            letterSpacing: "-0.08em"
                                        }}>and others...</p>
                                    }
                                </div>
                            </p>
                            <p className="h6 mt-3 pt-1 me-4 fw-bold">
                                ORDER NUMBER #{order.orderNumber}
                                <br />
                                <span className="h6 fw-light">
                                    Purchase Date: <span className="fw-normal">{order.cardDetails.purchaseDate}</span>
                                </span>
                            </p>

                        </Col>
                    )
                    :
                    <div className="h4 fw-normal">You still have to place an order!</div>
                    }
                </Row>
            </Container>
        </>
    )
}