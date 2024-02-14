import { Navbar, Container } from "react-bootstrap"
import ButtonMui from "@mui/material/Button"
import { Typography, Grid, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setOrderDetails } from "../reducers/orderDetailsSlice"

export default function PaymentDetailsPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    console.log(orderDetails)

    const handleNext = () => {
        if (!orderDetails.paymentAddress) {
            dispatch(setOrderDetails({
                orderPaymentAddress: {
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    province: document.getElementById("province").value,
                    zip: document.getElementById("zip").value,
                    country: document.getElementById("country").value,
                }
            }))
            navigate("/reviewOrderPage")
        } else {
            navigate("/reviewOrderPage")
        }

    }

    return (
        <>
            <Navbar className="bg-dark text-white">
                <h1 className="fw-bold my-2 ms-3">The Book Club</h1>
            </Navbar>

            <Container className="checkoutContainers">
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h1>Checkout</h1>
                    <div>
                        <ButtonMui
                            onClick={() => navigate("/paymentShippingPage")}
                            className="me-3">
                            Go back
                        </ButtonMui>
                    </div>
                </div>

                <div className="my-2 d-flex align-items-center">
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
                    <span className="paymentPhaseCircle rounded-circle border border-primary mx-2 bg-primary text-light">
                        2
                    </span>
                    <p className="m-0 p-0 fw-bold text-nowrap">
                        Payment details
                    </p>
                    <span className="ms-2 text-nowrap">
                        --
                    </span>
                    <span className="paymentPhaseCircle rounded-circle mx-2 border bg-light ">
                        3
                    </span>
                    <p className="m-0 p-0 text-nowrap">
                        Review your order
                    </p>
                </div>
                <Typography
                    variant="h6"
                    className="my-4">
                    Payment method
                </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="cardName"
                            name="cardName"
                            label="Card owner name"
                            fullWidth
                            autoComplete="cardName"
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="cardNumber"
                            name="cardNumber"
                            label="Card number"
                            fullWidth
                            autoComplete="cardNumber"
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="expirationDate"
                            name="expirationDate"
                            label="Expiration date"
                            fullWidth
                            autoComplete="expirationDate"
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="cvv"
                            name="cvv"
                            label="CVV"
                            helperText="Last three digits on signature strip"
                            fullWidth
                            autoComplete="cvv"
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                </Grid>

                {!orderDetails.paymentAddress &&
                    <>
                        <Grid container spacing={4}>
                            <Typography
                                variant="h6"
                                className="mt-5 pt-2 ms-4 ps-2">
                                Payment address
                            </Typography>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address"
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="province"
                                    name="province"
                                    label="Province"
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="zip"
                                    name="zip"
                                    label="Postal code"
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="country"
                                    name="country"
                                    label="Country"
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </>
                }
                <ButtonMui
                    onClick={() => handleNext()}
                    variant="contained"
                    className="my-5">
                    Next
                </ButtonMui>

            </Container>
        </>
    )
}
