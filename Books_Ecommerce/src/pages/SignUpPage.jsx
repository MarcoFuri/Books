import { Spinner } from "react-bootstrap"
import { Container, Grid, TextField, Typography, CssBaseline, Box, Button, Link } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function SignUpPage() {

    const existingUsers = JSON.parse(localStorage.getItem("existingUsers")) || []

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [emailFormatError, setEmailFormatError] = useState(false)
    const [existingUserError, setExistingUserError] = useState(false)
    const [password1, setPassword1] = useState("")
    const [password1Error, setPassword1Error] = useState(false)
    const [password2, setPassword2] = useState("")
    const [password2Error, setPassword2Error] = useState(false)

    const [loading, setLoading] = useState(false)

    const [users, setUsers] = useState(existingUsers)

    useEffect(() => {
        const updatesUsers = JSON.stringify(users)
        localStorage.setItem("existingUsers", updatesUsers)
    }, [users])

    useEffect(() => {
        setExistingUserError(false)
    }, [email])

    const handleSignUp = () => {

        if (emailFormatError || existingUserError || password1Error || password2Error) {
            return
        }

        if (existingUsers.length > 0) {
            if (existingUsers.find((el) => el.email === email) !== undefined) {
                return setExistingUserError(true)
            }
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._%+\-!?@])[a-zA-Z0-9._%+\-!?@]{8,}$/;

        if (!emailRegex.test(email)) {
            setEmailFormatError(true)
            setTimeout(() => setEmailFormatError(false), 4000)
        } else if (!passwordRegex.test(password1)) {
            setPassword1Error(true)
            setTimeout(() => setPassword1Error(false), 4000)
        } else if (password1 !== password2) {
            setPassword2Error(true)
            setTimeout(() => setPassword2Error(false), 4000)
        } else {
            setLoading(true)
            const newUser = {
                firstName,
                lastName,
                email,
                password: password1,
            }
            setUsers(
                [
                    ...users,
                    newUser
                ]
            )
            
            setTimeout(() => {
                navigate("/loginPage")
            }
                , 2000)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {!loading && <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h2" variant="h6">
                    Sign up
                </Typography>
                <Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                fullWidth
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                autoFocus
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                variant="filled"
                                error={emailFormatError || existingUserError}
                                helperText={
                                    emailFormatError && "Not valid email format"
                                    || existingUserError && "Email already in use!"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setPassword1(e.target.value)}
                                required
                                fullWidth
                                name="password1"
                                label="Password"
                                type="password"
                                id="password1"
                                variant="filled"
                                error={password1Error}
                                helperText={password1Error ?
                                    "Format of the password not valid. Requires at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol."
                                    : "Requires at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol."}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                                fullWidth
                                name="password2"
                                label="Password"
                                type="password"
                                id="password2"
                                variant="filled"
                                error={password2Error}
                                helperText={password2Error && "Passwords don't match!"}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={() => handleSignUp()}
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex">
                        <Grid item>
                            <Link href="/loginPage" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>}
            {loading && <div className="text-center mt-5">
                <h2 className="fw-normal text-dark">Welcome to <span className="fw-bold">The Book Club!</span></h2>
                <h3 className="text-dark">Redirecting...</h3>
                <Spinner className="" animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>}
        </Container>
    )
}