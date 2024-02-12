import ButtonMui from "@mui/material/Button"
import { TextField, Typography, Grid } from "@mui/material"
import { Navbar} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function PaymentPage() {

    const navigate = useNavigate()

    return (
        <>
            <Navbar className="bg-dark text-white">
                <h1 className="fw-bold my-2 ms-3">The Book Club</h1>
            </Navbar>
            <div className="d-flex justify-content-between">
                <h1 className="ms-5 mt-4">Checkout</h1>
                <ButtonMui onClick={() => navigate("/cartPage")} className="me-3">Go back</ButtonMui>
            </div>
            
            <div className="m-5">
                <Typography variant="h6" className="my-4">
                    Shipping address
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="Province"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Postal code"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default PaymentPage