import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../reducers/loginStatusSlice';
import { setUserLogged } from '../reducers/userLoggedSlice';
import { setCart } from '../reducers/modifyCartSlice';

function LoginPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userNotFoundError, setUserNotFoundError] = useState(false)
    const [checkboxStatus, setCheckboxStatus] = useState(false)

    // const users = JSON.parse(localStorage.getItem("existingUsers"))

    // const usersCartStored = localStorage.getItem("usersCart") ?
    // JSON.parse(localStorage.getItem("usersCart")) : []
    //
    // const unmatchedCartStored = JSON.parse(localStorage.getItem("unmatchedCart"))

    const handleCheckboxStatus = () => {
        setCheckboxStatus(!checkboxStatus)
    }

    const handleSignIn = async () => {
        await fetch("http://localhost:5050/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`
            })
        })
            .then(res => {
                if(!res.ok) {
                    console.log("User not found")
                    setUserNotFoundError(true)
                } else {
                    res.json()
                    if (checkboxStatus) {
                        const userToRememberLoggedIn = JSON.stringify({email, password})
                        localStorage.setItem("userToRememberLoggedIn", userToRememberLoggedIn)
                    }
                    dispatch(setLoggedIn())
                    dispatch(setUserLogged({email, password}))
                    navigate("/mainPage")
                }
            })

            // if (checkboxStatus) {
            //     const userToRememberLoggedIn = JSON.stringify(users[indexUser])
            //     localStorage.setItem("userToRememberLoggedIn", userToRememberLoggedIn)
            // }
            // dispatch(setLoggedIn())
            // dispatch(setUserLogged(users[indexUser]))
            //
            //
            // const userLoggingInCartStored = usersCartStored.find((el) => el.email === users[indexUser].email) !== undefined ?
            // usersCartStored.find((el) => el.email === users[indexUser].email) : { email: users[indexUser].email, cart: [] }
            // console.log("the user cart is this:", userLoggingInCartStored)
            //
            // const userLoggingInCartStoredIndex = usersCartStored.findIndex((el) => el.email === users[indexUser].email)


            // if (unmatchedCartStored) {
            //     unmatchedCartStored.forEach((unmatchedBook) => {
            //         const bookAlreadyAdded = userLoggingInCartStored.cart.find( (userBook) => unmatchedBook.id === userBook.id )
            //         if (bookAlreadyAdded) {
            //             bookAlreadyAdded.quantity += 1
            //         } else {
            //             userLoggingInCartStored.cart.push(unmatchedBook)
            //         }
            //     })
            //     if (userLoggingInCartStoredIndex === -1) {
            //         usersCartStored.push(userLoggingInCartStored)
            //     }
            //     localStorage.setItem("usersCart", JSON.stringify(usersCartStored))
            //     localStorage.removeItem("unmatchedCart")
            // }
        }

    return (
        <Grid
            container
            component="main"
            sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item
                xs={0}
                sm={5}
                md={7}
                className='welcomeBackground' />
            <Grid
                item
                xs={12}
                sm={7}
                md={5}
                elevation={6}
            >
                <Box sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography component="h2" variant="h6">
                        Sign in
                    </Typography>
                    <Grid>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="filled"
                            error={userNotFoundError}
                            helperText={userNotFoundError && "Email or password not correct."}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            variant="filled"
                        />
                        <FormControlLabel
                            onClick={handleCheckboxStatus}
                            control={<Checkbox
                                value="remember"
                                color="primary"
                            />}
                            label="Remember me"
                        />
                        <Button
                            onClick={() => handleSignIn()}
                            type="button"
                            fullWidth
                            variant="contained"
                            className="my-4">
                            Sign In
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                            <Grid item>
                                <Link href="/signUpPage" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LoginPage