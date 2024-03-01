import ButtonMui from "@mui/material/Button"
import { TextField, Typography, Grid, Checkbox, FormControlLabel } from "@mui/material"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function PaymentShippingPage() {

    const navigate = useNavigate()

    const [checkboxStatus, setCheckboxStatus] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [zip, setZip] = useState("")
    const [country, setCountry] = useState("")

    const today = new Date()
    const purchaseDate = today.getDate() + "/" + (today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1) + "/" + today.getFullYear()

    const handleChangeCheckbox = () => {
        setCheckboxStatus(!checkboxStatus)
    }

    const handleZipChange = (e) => {
        const input = e
        const cleanedInput = input.replace(/\D/g, "")
        setZip(cleanedInput)
    }

    useEffect(() => {
        if (localStorage.getItem("userShippingDetails")) {
            const userOrdersDetailsSaved = JSON.parse(localStorage.getItem("userShippingDetails"))
            setFirstName(userOrdersDetailsSaved.firstName)
            setLastName(userOrdersDetailsSaved.lastName)
            setAddress(userOrdersDetailsSaved.address)
            setCity(userOrdersDetailsSaved.city)
            setProvince(userOrdersDetailsSaved.province)
            setZip(userOrdersDetailsSaved.zip)
            setCountry(userOrdersDetailsSaved.country)
            setCheckboxStatus(false)
        }
    }, [])

    const handleSubmit = () => {
        //check form?
        const userOrdersDetails = {
            firstName,
            lastName,
            address,
            city,
            province,
            zip,
            country,
            paymentAddress: checkboxStatus,
            orderPaymentAddress: checkboxStatus ? address : "",
            purchaseDate,
        }
        localStorage.setItem("userShippingDetails", JSON.stringify(userOrdersDetails))
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
                            className="buttonHover me-3"
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
                                className="rounded-circle border border-primary me-2 bg-primary text-light"
                                style={{padding:"2px 12px 2px 12px"}}
                                >
                                1
                            </span>
                        <p className="m-0 p-0 fw-bold text-nowrap">Shipping details</p>
                        <span className="ms-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span 
                            className="rounded-circle mx-2 border bg-light"
                            style={{padding:"2px 10px 2px 10px"}}
                            >
                            2
                        </span>
                        <p className="m-0 p-0 text-nowrap">Payment details</p>
                        <span className="mx-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span className="rounded-circle me-2 border bg-light"
                            style={{padding:"2px 10px 2px 10px"}} 
                        >
                            3
                        </span>
                        <p className="m-0 p-0 text-nowrap">Review your order</p>
                    </div>
                </div>
                
                <Typography
                    variant="h6"
                    className="my-4"
                    style={{fontFamily:"Work Sans, sans-serif"}}
                    >
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
                                value={firstName}
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
                                value={lastName}
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
                                helperText="Please enter your full address, including house number and street name (e.g., '123 Main Street')."
                                value={address}
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
                                value={city}
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
                                value={province}
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
                                value={country}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={() => handleChangeCheckbox()}
                                        name="saveAddress"
                                        className="buttonHover"
                                        style={{
                                            backgroundColor:"rgba(0,0,0,0)",
                                            color:"black"
                                        }}
                                    />
                                }
                                label="Use same address for payment details"
                            />
                        </Grid>
                        <div className="ms-4 mt-3 mb-5">
                            <ButtonMui
                                type="submit"
                                variant="outlined"
                                className="buttonHover ms-3"
                                style={{
                                    color:"black",
                                    backgroundColor:"rgba(249, 246, 246, 0.7)",
                                    borderColor:"rgb(0,0,0,0.2)"
                                }}>
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