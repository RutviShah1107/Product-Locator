import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Alert } from '@material-ui/lab'
import { AppBar, Toolbar } from '@material-ui/core'
import { Box, Grid, Typography, TextField, Button, Avatar } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { makeStyles } from '@material-ui/core/styles'
import img from '../../assets/warehouse.jpg'

import axios from 'axios'

import '../../context/authContext'

const useStyle = makeStyles((theme) => ({
    root: {
        'width': '100%',
        'min-height': 'calc(100vh - 65px)',
        'backgroundImage': `url(${img})`,
        'background-size': 'cover'
    },
    brand: {

    },
    avatar:{
        'margin': '0 auto',
        'background': 'red',
        'width': '60px',
        'height': '60px',
    },
    form: {
        'color': 'white',
        'max-width': '500px',
        'background': '#252424d9',
        'border-radius': '10px',
        'padding': '10px 0',
        'margin': '0 10px',
        '& > div': {
            'margin': '0 10px'
        }
    },
    input: {
        '& > div.Mui-focused > fieldset.MuiOutlinedInput-notchedOutline': {
            'border-color': 'lightgrey'
        },
        '& > label, & > div > input': {
            'color': 'white',
        },
        '& > label.Mui-focused':{
            'color': 'lightgrey'
        },
    },

    button: {
        'background': theme.palette.info.main,
        'color': 'white',
        '&:hover': {
            background: theme.palette.info.dark
        }
    },
    loader: {
        'padding': '0 10px'
    }
}))

const Login = () => {

    const [cookies, setCookie ] = useCookies()

    const [ redirect, setRedirect ] = useState(cookies.key ? '/dashboard' : '')

    const [ username, setUsername ] = useState({'value': '', 'error': ''})
    const [ password, setPassword ] = useState({'value': '', 'error': ''})
    const [ errors, setErrors ] = useState('')

    const [ loading, setLoading ] = useState(false)

    const classes = useStyle()

    const handleUser = (event) => {
        setErrors('')
        setUsername({
            'value': event.target.value,
            'error': '',
        })
    }

    const handlePassword = (event) => {
        setErrors('')
        setPassword({
            'value': event.target.value,
            'error': '',
        })
    }

    const handleLogin = () => {
        setLoading(true)
        
        axios.post('http://127.0.0.1:8000/auth/login/', {
            'username': username.value,
            'password': password.value
        })
        .then((response) => {
            let expires = new Date()
            expires.setDate(expires.getDate() + 1)
            setCookie('key', response.data.key, {
                expires: expires,
                path: '/',
                secure: true,
                sameSite: "none",
            })
            setRedirect('/dashboard')
        })
        .catch((err) => {
            console.log(err.response)
            setLoading(false)
            setErrors(err.response.data.non_field_errors)
            setPassword((prevState) => ({
                ...prevState, error: err.response.data.password
            }))
            setUsername((prevState) => ({
                ...prevState, error: err.response.data.username
            }))
            
        })
    }

    const handleRedirect = () => {
        return <Redirect to={redirect} />
    }

    return (
        <React.Fragment>
            {redirect && handleRedirect() }
            <AppBar position="sticky">
                <Toolbar>
                    <Typography component="div" variant="h6">Product Locator</Typography>
                </Toolbar>
            </AppBar>    
            <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
                <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12}>
                        <Avatar className={classes.avatar} >
                            <LockOpenIcon fontSize="large"/>
                        </Avatar>
                        <Typography color="inherit" component="div" variant="h4" align="center">Login</Typography>
                        { errors && <Alert severity="error">{errors}</Alert> }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            autoFocus
                            className={classes.input}
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username.value}
                            error={Boolean(username.error)}
                            helperText={username.error}
                            onChange={handleUser}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            className={classes.input}
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password.value}
                            error={Boolean(password.error)}
                            helperText={password.error}
                            onChange={handlePassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" className={classes.button} fullWidth onClick={handleLogin}>Log In! {loading && <CircularProgress size={24} className={classes.loader}/>}</Button>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default Login