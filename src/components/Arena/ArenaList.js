import React, { useState, useEffect, useContext } from 'react'
import { Container, Box } from '@material-ui/core'
import { Typography, Button } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import Arena from './ArenaDetail/Arena'
import AuthContext from '../../context/authContext'

import axios from 'axios'

const useStyle = makeStyles((theme) => ({
    root: {
        'margin-top': '20px'
    },
    divider: {
        'border': '0.25px solid #c4c4c4'
    },
    button: {
        'background': theme.palette.info.dark,
        'margin': '0 8px',
        'padding': '8px 40px',
        '&:hover':{
            'background': theme.palette.info.main
        }
    },
    arena: {
        'margin-top': '50px',
    }
}))

const ArenaList = () => {

    const [ arenas, setArenas ] = useState([])
    const [ arenaData, setArenaData ] = useState({
        'location_id': '',
        'rows': 0,
        'cols': 0,
        'products': []
    })

    const { user } = useContext(AuthContext)

    const classes = useStyle()

    useEffect(() => {
        if(arenas.length)
            setArenaData(arenas[0])
    }, [ arenas ])

    useEffect(() => {
        if(axios.defaults.headers.common['Authorization']){
            axios.get('http://127.0.0.1:8000/api/arena/')
            .then((response) => {
                console.log(response.data)
                setArenas(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
    }, [ user ])

    const handleArena = (event) => {
        const data = arenas.find((arena) => event.currentTarget.getAttribute('data-location-id') === arena.location_id)
        if(data){
            setArenaData(data)
        }
    }



    return (
        <Container classes={{root: classes.root}} maxWidth="lg">
            <Typography component="div" variant="h4" align="center">Arenas</Typography>
            <hr className={classes.divider}/>
            <Box display="flex" maxWidth="lg" justifyContent="center">
                {arenas.map((arena) => (
                    <Button variant="contained" key={arena.location_id} size="large" color="primary" className={classes.button} data-location-id={arena.location_id} onClick={handleArena}>{arena.location_id}</Button>
                ))}
            </Box>
            <Container maxWidth="md" className={classes.arena}>
                <Arena veiw={true} data={arenaData} loading={false} />
            </Container>
        </Container>
    )
}

export default ArenaList
