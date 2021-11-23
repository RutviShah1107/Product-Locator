import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
    root: {
        'color': 'white',
        'margin': theme.spacing(1),
        '& > .header': {
            'display': 'flex',
            'justifyContent': 'center',
            'alignItems': 'center',
            '& > div': {
                'padding': '16px',
            }
        },
        '& > .body': {
            'padding': '20px',
            'minHeight': '50px' 
        }
    },

}))

const Stat = (props) => {

    const [ grow, setGrow ] = useState(false)
    const classes = useStyle()

    useEffect(() => {
        setGrow(true)
    }, [])

    return (
        <Grow in={grow} timeout={500}>
            <Paper elevation={4} className={classes.root} style={{background: props.bg}}>
                {props.children}
            </Paper>
        </Grow>
    )
}

export default Stat