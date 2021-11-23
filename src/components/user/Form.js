import React, { useState } from 'react'
import { Container, Paper, Grid, Typography } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

const useStyle = makeStyles({
    root: {
        'margin-top': '45px',
    },
    wrapper: {
        'padding': '20px 10px',
    },
    button: {
        'color': 'white',
        'background-color': '#28a745',
        '&:hover': {
            'background-color': '#1d9238',
        }
    }
})

const UserForm = () => {

    const classes = useStyle()
    
    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState('')
    const [ state, setState ] = useState({
        'username': '',
        // 'email': '',
        'password1': '',
        'password2': ''
    })
    const [ error, setError ] = useState({
        'username': '',
        'password1': '',
        'password2': ''
    })

    const handleChange = (event) => {
        setSuccess('')
        setError({
            'username': '',
            'password1': '',
            'password2': ''
        })
        
        const label = event.target.name
        const value = event.target.value

        setState((prevState) => {
            let newState = { ...prevState }
            newState[label] = value
            return newState
        })
    }

    const handleSubmit = () => {
        
        setLoading(true)
        axios.post('http://127.0.0.1:8000/auth/register/', state)
        .then((response) => {
            setSuccess('User Registered')
            console.log(response.data)
            setState({
                'username': '',
                'password1': '',
                'password2': ''
            })
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err.response)
            setError({
                'username': err.response.data.username,
                'password1': err.response.data.password1 && err.response.data.password1.join(" "),
                'password2': err.response.data.non_field_errors && err.response.data.non_field_errors[0],
            })
        })
        
    }

    return (
        <Container maxWidth="sm"  className={classes.root}>
            <Grid container spacing={2} component={Paper} className={classes.wrapper}>
                <Grid item xs={12}>
                    <Typography component="div" variant="h4" align="center">Register User</Typography>
                    { success && <Alert severity="success" >{success}</Alert> }
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Username" 
                        value={state.username}
                        name="username"
                        error={Boolean(error.username)}
                        helperText={error.username}
                        variant="outlined"
                        onChange={handleChange} 
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={state.password1}
                        label="Password" 
                        name="password1"
                        variant="outlined" 
                        error={Boolean(error.password1)}
                        helperText={error.password1}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={state.password2}
                        label="Confirm Password"
                        name="password2" 
                        variant="outlined" 
                        error={Boolean(error.password2)}
                        helperText={error.password2}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" className={classes.button} onClick={handleSubmit}>Register</Button>
                    { loading && <LinearProgress /> }
                </Grid>
            </Grid>
        </Container>
    )
}

export default 
