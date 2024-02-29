import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ButtonMui from "@mui/material/Button"

export default function ProfilePage() {

    const userLogged = useSelector(state => state.userLogged)
    const ordersConfirmed = JSON.parse(localStorage.getItem("ordersConfirmed"))

    const userLoggedOrders = []
    
    ordersConfirmed.forEach((el) => {
        if (el.email === userLogged.email) {
            userLoggedOrders.push(el)
        }
    })

    console.log(userLoggedOrders)

    return (
        <>
            <Container>
                <div className="mt-4">
                    <p className="h3 fw-bold">Personal Profile</p>
                    <p className="h6 fw-normal">Your orders:</p>
                </div>
                <Row className="mt-3"> 
                    {userLoggedOrders.map((order, index) =>
                            <ButtonMui 
                                key={index}
                                className="bg-light border border-1 rounded mb-3"
                                style={{height:"7rem"}}
                                >
                                <p className="h4 mt-2 fw-bold">Order Number #{order.orderNumber}</p>

                            </ButtonMui>
                    )}
                </Row>
            </Container>
        </>
    )
}