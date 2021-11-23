import React, { useState } from 'react'
import { Container, Paper, Grid, Typography } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

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

const ArenaForm = () => {

    const classes = useStyle()
    
    const [ loading, setLoading ] = useState(false)
    const [ state, setState ] = useState({
        'location_id': '',
        'rows': '',
        'cols': ''
    })
    const [ success, setSucces ] = useState('')
    const [ error, setError ] = useState({
        'location_id': '',
        'rows': '',
        'cols': ''
    })


    const handleChange = (event) => {
        setSucces('')
        setError({
            'location_id': '',
            'rows': '',
            'cols': ''
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
        axios.post('http://127.0.0.1:8000/api/arena/', state)
        .then((response) => {
            console.log(response.data)
            setState((prevState) => ({
                'location_id': '',
                'rows': '',
                'cols': ''
            }))
            setSucces('Arena Added')
            setLoading(false)
        })
        .catch((err) => {
            console.log(err.response)
            setError(err.response.data)
            setLoading(false)
        })
        
    }

    return (
        <Container maxWidth="sm"  className={classes.root}>
            <Grid container spacing={2} component={Paper} className={classes.wrapper}>
                <Grid item xs={12}>
                    <Typography component="div" variant="h4" align="center">New Arena</Typography>
                    { success && <Alert severity="success">{success}</Alert> }
                    { error.non_field_errors && <Alert severity="error">{error.non_field_errors.join(" ").capital}</Alert> }
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Arena ID" 
                        value={state.location_id}
                        name="location_id"
                        variant="outlined"
                        onChange={handleChange} 
                        error={Boolean(error.location_id)}
                        helperText={error.location_id}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={state.rows}
                        label="Rows" 
                        name="rows"
                        variant="outlined" 
                        onChange={handleChange}
                        type="number"
                        error={Boolean(error.rows)}
                        helperText={error.rows}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={state.cols}
                        label="Columns"
                        name="cols" 
                        variant="outlined" 
                        onChange={handleChange}
                        type="number"
                        error={Boolean(error.cols)}
                        helperText={error.cols}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" className={classes.button} onClick={handleSubmit}>Add</Button>
                    { loading && <LinearProgress /> }
                </Grid>
            </Grid>
        </Container>
    )
}

export default ArenaForm