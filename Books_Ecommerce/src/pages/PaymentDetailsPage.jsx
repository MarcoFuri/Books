import ButtonMui from "@mui/material/Button"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container } from "react-bootstrap"
import { Typography, Grid, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css"


export default function PaymentDetailsPage() {

    const navigate = useNavigate()

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [zip, setZip] = useState("")
    const [country, setCountry] = useState("")

    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cvv, setCvv] = useState("")
    const [expiryDate, setExpiryDate] = useState(null)
    const [expiryDateError, setExpiryDateError] = useState(false)
    const [expiryDateSet, setExpiryDateSet] = useState(false)
    const [purchaseDate, setPurchaseDate] = useState("")
    const [cardUserDetails, setCardUserDetails] = useState("")
    const [cardDetailsAdded, setCardDetailsAdded] = useState(false)

    const orderDetails = JSON.parse(localStorage.getItem("userShippingDetails"))

    const today = new Date()

    useEffect(() => {
        if (expiryDateSet) {
            if (expiryDate.$y < today.getFullYear()) {
                return setExpiryDateError(true)
            } else if (expiryDate.$y === today.getFullYear && expiryDate.$M < today.getMonth()) {
                return setExpiryDateError(true)
            } else if (expiryDate.$y > today.getFullYear + 10) {
                return setExpiryDateError(true)
            }
        }
    }, [expiryDate])

    useEffect(() => {
        if (cardDetailsAdded) {
            localStorage.setItem("cardOrderDetails", JSON.stringify(cardUserDetails))
            console.log(cardUserDetails)
            navigate("/reviewOrderPage")
        }
    }, [cardUserDetails])

    const handleCardNumberChange = (e) => {
        const input = e
        const cleanedInput = input.replace(/\D/g, "")
        setCardNumber(cleanedInput)
    }

    const handleChangeExpiryDate = (date) => {
        setExpiryDate(date)

        let todayMonth;
        let todayDate;

        if (today.getMonth() + 1 < 10) {
            todayMonth = "0" + (today.getMonth() + 1)
        } else {
            todayMonth = today.getMonth() + 1
        }

        if (today.getDate() < 10) {
            todayDate = "0" + today.getDate()
        } else {
            todayDate = today.getDate()
        }

        setPurchaseDate(`${todayMonth}/${todayDate}/${today.getFullYear()}`)

        setExpiryDateError(false)
        setExpiryDateSet(true)
    }

    const handleCvvChange = (e) => {
        const input = e
        const cleanedInput = input.replace(/\D/g, "")
        setCvv(cleanedInput)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expiryDateError || !expiryDate) {
            return setExpiryDateError(true)
        } else {

            let cardDetails = {
                cardName,
                cardNumber,
                cvv,
                expiryDateMonth: (expiryDate.$M + 1),
                expiryDateYear: expiryDate.$y,
                purchaseDate
            }


            if (!orderDetails.paymentAddress) {
                cardDetails = {
                    ...cardDetails,
                    orderPaymentAddress: {
                        address,
                        city,
                        province,
                        zip,
                        country,
                    }
                }

            }

            setCardUserDetails(cardDetails)
            setCardDetailsAdded(true)
        }
    }

    return (
        <>
            <Container className="checkoutContainers">
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h1>Checkout</h1>
                    <div>
                        <ButtonMui
                            onClick={() => navigate("/paymentShippingPage")}
                            className="buttonHover me-3"
                            style={{
                                backgroundColor: "rgba(249, 246, 246, 0.7)",
                                color: "black"
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
                            style={{ padding: "2px 8px 2px 8px" }}
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
                        <span className="ms-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span
                            className="paymentPhaseCircle rounded-circle border border-primary mx-2 bg-primary text-light"
                            style={{ padding: "2px 10px 2px 10px" }}
                        >
                            2
                        </span>
                        <p className="m-0 p-0 fw-bold text-nowrap">
                            Payment details
                        </p>
                        <span className="mx-2 text-nowrap">
                            --
                        </span>
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <span
                            className="paymentPhaseCircle rounded-circle me-2 border bg-light "
                            style={{ padding: "2px 10px 2px 10px" }}
                        >
                            3
                        </span>
                        <p className="m-0 p-0 text-nowrap">
                            Review your order
                        </p>
                    </div>
                </div>
                <Typography
                    variant="h6"
                    className="my-4">
                    Payment method
                </Typography>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => setCardName(e.target.value)}
                                required
                                id="cardName"
                                name="cardName"
                                label="Card owner name"
                                fullWidth
                                autoComplete="cardName"
                                variant="filled"
                                value={cardName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => handleCardNumberChange(e.target.value)}
                                required
                                id="cardNumber"
                                name="cardNumber"
                                label="Card number"
                                inputProps={{ inputMode: 'numeric', maxLength: 16, minLength: 16 }}
                                value={cardNumber}
                                fullWidth
                                autoComplete="cardNumber"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        onChange={(date) => handleChangeExpiryDate(date)}
                                        required
                                        id="expiryDate"
                                        label={'Expiry date*'}
                                        views={["month", 'year']}
                                        value={expiryDate}
                                    // let's handle this another time.
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            {expiryDateError &&
                                <p
                                    className="ms-1 ps-1"
                                    style={{
                                        fontSize: "0.78rem",
                                        color: "red",
                                        textDecoration: "underline"
                                    }}
                                >
                                    Please insert a valid date!
                                </p>
                            }
                        </Grid>
                        <Grid item xs={6} className="mt-2">
                            <TextField
                                onChange={(e) => handleCvvChange(e.target.value)}
                                required
                                id="cvv"
                                name="cvv"
                                label="CVV"
                                inputProps={{ inputMode: 'numeric', maxLength: 3, minLength: 3 }}
                                value={cvv}
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cvv"
                                variant="filled"

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
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        variant="filled"
                                        size="small"
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
                                        onChange={(e) => setZip(e.target.value)}
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Postal code"
                                        fullWidth
                                        variant="filled"
                                        size="small"
                                        value={zip}
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
                            </Grid>
                        </>
                    }
                    <ButtonMui
                        type="submit"
                        variant="outlined"
                        className="buttonHover my-5"
                        style={{
                            color: "black",
                            backgroundColor: "rgba(249, 246, 246, 0.7)",
                            borderColor: "rgb(0,0,0,0.2)"
                        }}
                    >
                        Next
                    </ButtonMui>
                </form>
            </Container>
        </>
    )
}
