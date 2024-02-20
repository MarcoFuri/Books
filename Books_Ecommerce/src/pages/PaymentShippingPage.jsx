import ButtonMui from "@mui/material/Button"
import { TextField, Typography, Grid, Checkbox, FormControlLabel } from "@mui/material"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setOrderDetails } from "../reducers/orderDetailsSlice"

function PaymentShippingPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [checkboxStatus, setCheckboxStatus] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [zip, setZip] = useState("")
    const [country, setCountry] = useState("")

    const handleChangeCheckbox = () => {
        setCheckboxStatus(!checkboxStatus)
        console.log(checkboxStatus)
    }

    const handleZipChange = (e) => {
        const input = e
        const cleanedInput = input.replace(/\D/g, "")
        setZip(cleanedInput)
    }


    const handleSubmit = () => {
        //check form?        
        dispatch(setOrderDetails({
            firstName,
            lastName,
            address,
            city,
            province,
            zip,
            country,
            paymentAddress: checkboxStatus,
            orderPaymentAddress: checkboxStatus ? address : ""
        }))
        navigate("/paymentDetailsPage")

    }

    return (
        <>
            <Container className="checkoutContainers">
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h1>Checkout</h1>
                    <div>
                        <ButtonMui
                            onClick={() => navigate("/cartPage")}
                            className="me-3">
                            Go back
                        </ButtonMui>
                    </div>
                </div>
                <div className="my-3 d-flex flex-wrap">
                    <div className="d-flex align-items-center pb-2">
                            <span className="paymentPhaseCircle rounded-circle border border-primary me-2 bg-primary text-light">
                                1
                            </span>
                        <p className="m-0 p-0 fw-bold text-nowrap">Shipping details</p>
                        <span className="ms-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span className="paymentPhaseCircle rounded-circle mx-2 border bg-light ">
                            2
                        </span>
                        <p className="m-0 p-0 text-nowrap">Payment details</p>
                        <span className="mx-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span className="paymentPhaseCircle rounded-circle me-2 border bg-light ">
                            3
                        </span>
                        <p className="m-0 p-0 text-nowrap">Review your order</p>
                    </div>
                </div>
                
                <Typography
                    variant="h6"
                    className="my-4">
                    Shipping address
                </Typography>
                <form onSubmit={() => handleSubmit()}>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => setFirstName(e.target.value)}
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
                                onChange={(e) => setLastName(e.target.value)}
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
                                onChange={(e) => setAddress(e.target.value)}
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
                                onChange={(e) => setCity(e.target.value)}
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
                                onChange={(e) => setProvince(e.target.value)}
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
                                onChange={(e) => handleZipChange(e.target.value)}
                                required
                                id="zip"
                                name="zip"
                                label="Postal code"
                                inputProps={{ inputMode: 'numeric', maxLength: 5, minLength: 5 }}
                                value={zip}
                                fullWidth
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => setCountry(e.target.value)}
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
                                // onClick={() => handleNext()}
                                variant="contained"
                                className="ms-3">
                                Next
                            </ButtonMui>
                        </div>
                    </Grid>
                </form>
            </Container>
        </>
    )
}

export default PaymentShippingPage