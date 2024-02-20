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

function LoginPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState("")
    const [emailNotFoundError, setEmailNotFoundError] = useState(false)
    const [password, setPassword] = useState("")
    const [incorrectPasswordError, setIncorrectPasswordError] = useState(false)

    const users = JSON.parse(localStorage.getItem("existingUsers"))

    const handleEmailChange = (e) => {
        setEmailNotFoundError(false)
        setEmail(e)
    }

    const handleSignIn = () => {

        if (users === null) {
            setEmailNotFoundError(true)
            return setTimeout(() => setEmailNotFoundError(false), 4000)
        } 
            
        const indexUser = users.findIndex((el) => el.email === email)
        
        if (indexUser === -1) {
            setEmailNotFoundError(true)
            setTimeout(() => setEmailNotFoundError(false), 5000)
        } else if (users[indexUser].password !== password) {
            setIncorrectPasswordError(true)
            setTimeout(() => setIncorrectPasswordError(false), 4000)
        } else {
            dispatch(setLoggedIn())
            navigate("/mainPage")
        }
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
                        alignItems: 'center'}}>
                        <Typography component="h2" variant="h6">
                            Sign in
                        </Typography>
                        <Grid>
                            <TextField
                                onChange={(e) => handleEmailChange(e.target.value)}
                                required
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                variant="filled"
                                error={emailNotFoundError}
                                helperText={emailNotFoundError && "Email not associated with an account yet, please Sign Up!"}
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
                                error={incorrectPasswordError}
                                helperText={incorrectPasswordError && "Incorrect password, please try again!"}
                            />
                            <FormControlLabel control=
                                {<Checkbox
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