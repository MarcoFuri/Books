import ButtonMui from "@mui/material/Button"
import { TextField, Typography, Grid, Checkbox, FormControlLabel } from "@mui/material"
import { Navbar, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setOrderDetails } from "../reducers/orderDetailsSlice"

function PaymentShippingPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [checkboxStatus, setCheckboxStatus] = useState(false)
    // const [orderInfo, setOrderInfo] = useState({
    //     name: "",
    //     lastName: "",
    //     address: "",
    //     city: "",
    //     province: "",
    //     zip: "",
    //     country: "",
    //     paymentAddress: false
    // })

    const handleChangeCheckbox = () => {
        setCheckboxStatus(!checkboxStatus)
        console.log(checkboxStatus)
    }

    const handleNext = () => {
        //check form?        
        dispatch(setOrderDetails({
            name: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            province: document.getElementById("province").value,
            zip: document.getElementById("zip").value,
            country: document.getElementById("country").value,
            paymentAddress: checkboxStatus,
            orderPaymentAddress: checkboxStatus ? document.getElementById("address").value : ""
        }))
        navigate("/paymentDetailsPage")

    }

    return (
        <>
            <Navbar className="bg-dark text-white">
                <h1 className="fw-bold my-2 ms-3">The Book Club</h1>
            </Navbar>


            <Container  className="checkoutContainers">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="mt-4">Checkout</h1>
                <div>
                    <ButtonMui
                        onClick={() => navigate("/cartPage")}
                        className="me-3">
                        Go back
                    </ButtonMui>
                </div>
            </div>
                <div className="my-3 d-flex align-items-center">
                    <span className="paymentPhaseCircle rounded-circle border border-primary me-2 bg-primary text-light">
                        1
                    </span>
                    <p className="m-0 p-0 fw-bold text-nowrap">Shipping details</p>
                    <span className="ms-2 text-nowrap">
                        --
                    </span>
                    <span className="paymentPhaseCircle rounded-circle mx-2 border bg-light ">
                        2
                    </span>
                    <p className="m-0 p-0 text-nowrap">Payment details</p> <span className="ms-2 text-nowrap">--</span>
                    <span className="paymentPhaseCircle rounded-circle mx-2 border bg-light ">
                        3
                    </span>
                    <p className="m-0 p-0 text-nowrap">Review your order</p>
                </div>
                <Typography
                    variant="h6"
                    className="my-4">
                    Shipping address
                </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="family-name"
                            variant="filled"
                            size="small"
                        />
                    </Grid>
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
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => handleChangeCheckbox()}
                                    color="primary"
                                    name="saveAddress"
                                />
                            }
                            label="Use same address for payment details"
                        />
                    </Grid>
                    <div className="ms-4 mt-3 mb-5">
                        <ButtonMui
                            type="submit"
                            onClick={() => handleNext()}
                            variant="contained"
                            className="ms-3">
                            Next
                        </ButtonMui>
                    </div>
                </Grid>
            </Container>
        </>
    )
}

export default PaymentShippingPage