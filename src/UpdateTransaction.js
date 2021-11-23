import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid } from '@material-ui/core'

// import { makeStyles } from '@material-ui/core/styles'

import Form from './Form/Form'
import Arena from '../../Arena/ArenaDetail/Arena'
import ArenaContext from '../../../context/arenaContext'
import AuthContext from '../../../context/authContext'

import axios from 'axios'

const UpdateTransaction = (props) => {
    let id = null

    if(props.update){
        id = props.match.params.id
    }
    
    const { token } = useContext(AuthContext)

    // Arena Context
    const [ arena, setArena ] = useState('')
    const [ productPos, setProductPos ] = useState({
        'arena': '',
        'row': '',
        'col': ''
    })
    const [ pos, setPos ] = useState({
        'row': '',
        'col': ''
    })

    // Arena Data
    const [ loading, setLoading ] = useState()
    const [ arenaData, setArenaData ] = useState({
        'location_id': '',
        'rows': 0,
        'cols': 0,
        'products': []
    })

    useEffect(() => {
        if(arena){
            setLoading(true)
            let source = axios.CancelToken.source()

            axios.get(`http://127.0.0.1:8000/api/arena/${arena}/`, {
                cancelToken: source.token
            })
            .then((response) => {
                setLoading(false)
                setArenaData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

            return () => (source.cancel())
        } else {
            setArenaData({
                'location_id': '',
                'rows': 0,
                'cols': 0,
                'products': []
            })
        }
    }, [ arena, token ])

    return (
        <ArenaContext.Provider value={{
            'arena': arena,
            'setArena': setArena,
            'pos': pos,
            'setPos': setPos,
            'productPos': productPos,
            'setProductPos': setProductPos
        }}>
            <Container maxWidth="lg" style={{marginTop: '30px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Form id={id} update={props.update} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Arena view={false} data={arenaData} loading={loading} />
                    </Grid>
                </Grid>
            </Container>
        </ArenaContext.Provider>
    )
}

export default UpdateTransaction