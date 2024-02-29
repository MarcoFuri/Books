import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ProfilePage() {

    const userLogged = useSelector(state => state.userLogged)

    return (
        <>
            <Container>
                <p className="h1 fw-light m-0 mt-3">Welcome Back <span className="fw-bold">{userLogged.firstName}</span>!</p>
                <p className="h5 fw-normal">Personal Profile</p>
                <p className="h6 fw-normal">Your orders:</p>
                {/* <Row>
                    {userLogged.userOrders.map((order, index) =>
                        <Col key={index} className="col-12 bg-light border border-1 rounded">
                            <p>{order.id}</p>
                        </Col>
                    )}
                </Row> */}
            </Container>
        </>
    )
}