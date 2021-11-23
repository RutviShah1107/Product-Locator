import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Paper, Box} from '@material-ui/core'
import { TextField, Button, Typography, Divider } from '@material-ui/core'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

import ArenaContext from '../../../../context/arenaContext'
import AuthContext from '../../../../context/authContext'

const useStyle = makeStyles({
    root:{
        'min-height': '500px',
        '& > div': {
            'margin': '10px 12px'
        }
    },
    button: {
        'color': 'white',
        'background-color': '#28a745',
        'margin': '0 10px',
        '&:hover': {
            'background-color': '#1d9238',
        }
    },
    add:{
        'margin': '0'
    },
    loader: {
        'background-color': '#3facb5',
    }
})

const Form = (props) => {
    const id = props.id

    const { user,  isAdmin } = useContext(AuthContext)
    const username = user.pk

    const [ allowUser, setAllowUser ] = useState(false)
    const [ success, setSuccess ] = useState('')
    const [ error, setError ] = useState({})
    const [ data, setData ] = useState({
        'product_id': '',
        'location_id': '',
        'user_id': '',
        'row': '',
        'col': ''
    })

    const [ loading, setLoading ] = useState(false)
    const [ toggleDialogBox, setToggleDialogBox ] = useState(false)

    const history = useHistory()

    const { arena, setArena, pos, setPos, setProductPos } = useContext(ArenaContext)
    
    const classes = useStyle() 

    useEffect(() => {
        if(!id){
            setData((prevData) => (
                {...prevData, user_id: username}
            ))
        }
    }, [ username, id ])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData, 
            row: pos.row,
            col: pos.col
        }))
    }, [ pos ])

    useEffect(() => {
        if(id && axios.defaults.headers.common['Authorization']){
            let source = axios.CancelToken.source()
            axios.get(`http://127.0.0.1:8000/api/transaction/${id}/`, {
                cancelToken: source.token
            })
            .then((response) => {
                console.log(response.data)
                setData(response.data)
                setArena(response.data.location_id)
                setProductPos({
                    'arena': response.data.location_id,
                    'row': response.data.row,
                    'col': response.data.col
                })
            })
            .catch((err) => {
                console.log(err.response)
            })

            return () => (source.cancel())
        }
    }, [ id, setArena, setProductPos ])

    useEffect(() => {
        if((username === data.user_id) || isAdmin === true){
            setAllowUser(true)
        }
    }, [ data, username, isAdmin ])

    const handleData = (event) => {
        setSuccess("")
        setError({})

        let nxtData = {...data}
        nxtData[event.target.name] = event.target.value

        setData(nxtData)
        if(nxtData['location_id'] !== arena){
            setArena(nxtData['location_id'])
            return
        }
        if( nxtData['row'] !== pos.row ||  nxtData['col'] !== pos.col ){
            setPos({
                'row': nxtData['row'] && Number(nxtData['row']),
                'col': nxtData['col'] && Number(nxtData['col']),
            })
        }
        
    }

    const handleUpdate = () => {
        setLoading(true)
        axios.put(`http://127.0.0.1:8000/api/transaction/${id}/`, data)
        .then((response) => {
            console.log(response.data)
            history.push('/dashboard/admin/')
        })
        .catch((err) => {
            console.log(err.response)
            setError(err.response.data)
            setLoading(false)
        })
    }

    const handlePost = () => {
        setLoading(true)
        axios.post(`http://127.0.0.1:8000/api/transaction/`, data)
        .then((response) => {
            console.log(response.data)
            setSuccess("Added Product")
            setData({
                'product_id': '',
                'location_id': '',
                'user_id': '',
                'row': '',
                'col': ''
            })
            setLoading(false)
            setArena('')
        })
        .catch((err) => {
            console.log(err.response)
            setError(err.response.data)
            setLoading(false)
        })
    }

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/transaction/${id}/`)
        .then((response) => {
            console.log(response.data)
            history.push('/dashboard/admin/')
        })
        .catch((err) => {
            console.log(err)
            setToggleDialogBox(false)
            setLoading(false)
        })
    }

    return (
        <React.Fragment>
            <Grid container component={Paper} className={classes.root}>
                <Grid item xs={12}>
                    <Typography component="div" variant="h4">Transaction</Typography>
                    { success && <Alert severity="success" >{success}</Alert> }
                    { error.non_field_errors && <Alert severity="error">{error.non_field_errors.join(" ")}</Alert> }
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        autoFocus
                        fullWidth
                        label="Product ID"
                        name="product_id"
                        onChange={handleData}
                        value={data.product_id}
                        error={Boolean(error.product_id)}
                        helperText={error.product_id}
                        variant="outlined"
                        disabled={Boolean(id)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Location ID"
                        name="location_id"
                        onChange={handleData}
                        value={data.location_id}
                        variant="outlined"
                        error={Boolean(error.location_id)}
                        helperText={error.location_id}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="User ID"
                        name="user_id"
                        // onChange={handleData}
                        value={data.user_id}
                        variant="outlined"
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Row"
                        name="row"
                        onChange={handleData}
                        type="number"
                        value={data.row}
                        variant="outlined"
                        error={Boolean(error.row)}
                        helperText={error.row}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Col"
                        name="col"
                        onChange={handleData}
                        type="number"
                        value={data.col}
                        variant="outlined"
                        error={Boolean(error.col)}
                        helperText={error.col}
                    />
                </Grid>
                <Grid item xs={12}>
                    {props.update ? (allowUser && (
                        <Box display="flex" justifyContent="start" alignItems="center">
                            <Button variant="contained" className={classes.button} onClick={handleUpdate}>Update</Button>
                            <Button variant="contained" color="secondary" onClick={() => setToggleDialogBox(true)} >Delete</Button>
                    
                            {loading && <CircularProgress size={24} style={{ margin: '0 10px' }}/>}
                            
                            <Dialog open={toggleDialogBox} onClose={() => setToggleDialogBox(false)}>
                                <DialogTitle>Delete Product</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Are you sure about deleting the product?</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="secondary" variant="outlined" onClick={() => handleDelete()}>Delete</Button>
                                    <Button variant="outlined" onClick={() => setToggleDialogBox(false)} autoFocus>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                            
                        </Box>
                    ))
                        : (
                        <React.Fragment>
                            <Button variant="contained" className={`${classes.button} ${classes.add}`} fullWidth onClick={handlePost}>
                                Add
                            </Button>
                            {loading && <LinearProgress className={classes.loader} />}
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Form