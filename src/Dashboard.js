import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import PersonIcon from '@material-ui/icons/Person'
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat'

import Stat from './Stat'
import Transactions from '../Transactions/Transaction'
import Filter from '../Dashboard/Filter/Filter'

import axios from 'axios'

const useStyle = makeStyles({
    statistic: {
        'margin': '45px 0px 30px',
    },
})

const UserDashboard = () => {

    const classes = useStyle()
    const [ user, setUser] = useState({
        'username': '',
        'email': '',
    })
    const [ data, setData ] = useState({
        'count': '',
        'transactions': [],
        'loading': true,
    })

    const setLoading = (isLoading) => {
        setData((prevState) => (
            {...prevState, 'loading': isLoading}
        ))
    }

    const setTransaction = (transactions) => {
        setData((prevState) => (
            {...prevState, 'transactions': transactions}
        ))
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const userResponse = await axios.get('http://127.0.0.1:8000/auth/user/')
                const transactions = await axios.get('http://127.0.0.1:8000/api/transaction/')
                setUser({
                    'username': userResponse.data.username,
                    'email': userResponse.data.email
                })
                setData({
                    'loading': false,
                    'transactions': transactions.data,
                    'count': transactions.data.length,
                })
            }catch(err){
                console.log(err)
            }   
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Grid container className={classes.statistic}>
                    <Grid item xs={12} md={6}>
                        <Stat bg="linear-gradient(270deg, rgb(251, 103, 103) 25%, rgb(253 77 39) 90%)" className={classes.stat}>
                            <div className='header'>
                                <PersonIcon fontSize="large"/> <Typography component="div" variant="h5">  User Info</Typography>
                            </div>
                            
                            <Divider />
                            
                            <div className='body'>
                                <Typography component="div" variant="body1"><strong>Username: </strong> {user.username}</Typography>
                                <Typography component="div" variant="body1"><strong>Email: </strong> {user.email} </Typography>
                            </div>
                        </Stat>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stat bg="linear-gradient(270deg, rgba(232,225,123,1) 1%, rgb(232 173 8) 100%)" className={classes.stat}>
                            <div className='header'>
                                <DirectionsBoatIcon fontSize="large"/>  <Typography component="div" variant="h5">Transactions</Typography>
                            </div>
                            
                            <Divider />
                            
                            <div className='body'>
                                <Typography component="div" variant="h4" align="center">{data.count}</Typography>
                            </div>
                        </Stat>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="xl">
                <Typography component="h4" variant="h4">Transaction Status</Typography>
                <Divider />

                <Filter setTransaction={setTransaction} setLoading={setLoading}/>

                <Transactions rows={data.transactions} loading={data.loading}/>
            </Container>
        </React.Fragment>
    )
}

export default UserDashboard