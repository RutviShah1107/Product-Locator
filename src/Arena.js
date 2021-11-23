import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, Grid, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Skeleton from '@material-ui/lab/Skeleton'

import ArenaContext from '../../../context/arenaContext'

const useStyle = makeStyles({
    root: {
        'background-color': '#394867',
        'position': 'relative',
        'height': '500px',
        'width':'100%',
    },
    arenaTitle: {
        'color': '#ebeff5',
        'padding': '10px 0',
    },
    layout:{
        'position': 'relative',
        'padding': '0 20px',
    },
    arena:{
        'width':'95%',
        'height': '390px',
        'overflow': 'auto',
        'whiteSpace': 'nowrap',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar':{
            'display': 'none',
        },
    },
    index:{
        'background': 'black',
        'color': 'white',
        'font-size': '0.75em',
        'text-align': 'center',
        'width': '20px',
        'height': '20px',
    },
    indexRow:{
        'width': '95%',
        '& > span': {
            'display': 'inline-block',
            'margin': '5px',
        },
        'overflow': 'hidden',
        'whiteSpace': 'nowrap',
    },
    indexCol:{
        'height': '390px',
        '& > span': {
            'display': 'block',
            'margin': '0 auto 14px'
        },
        '& > span:first-child': {
            'margin-top': '5px'
        },
        'overflow': 'hidden',
    },
    block:{
        'margin': '5px',
        'display': 'inline-block',
        'width': '20px',
        'height': '20px',
        'cursor': 'pointer',
        'transition': 'background 500ms'
    },
    
    filled:{
        'cursor': 'default',
        'background-color': '#636363',
    },
    selected: {
        'background-color': 'red',
    },
    product: {
        'cursor': 'default',
        'background-color': '#3cef65',
    },
})

const Arena = ({ data, veiw, loading }) => {

    const [ grow, setGrow ] = useState(false)

    const context = useContext(ArenaContext)
    let setPos = null, pos = null, productPos = null, arena = null

    if(context){
        arena = context.arena
        setPos = context.setPos
        pos = context.pos
        productPos = context.productPos
    }

    const arenaLayout = useRef()
    const indexRow = useRef()
    const indexCol = useRef()

    const selected = useRef(null)

    const classes = useStyle()

    useEffect(() => {
        if(arenaLayout){
            setGrow(true)
        }
    }, [ arenaLayout ])

    useEffect(() => {
        if(selected.current)
            selected.current.scrollIntoView({
                'block': 'end'
            })
    }, [ pos ])

    const handleScroll = () => {
        const y = arenaLayout.current.scrollTop
        const x = arenaLayout.current.scrollLeft

        indexRow.current.scrollLeft = x 
        indexCol.current.scrollTop = y
    }

    const handleRowCol = (event) => {
        if(!veiw){
            setPos({
                'row': Number(event.target.getAttribute('data-row')),
                'col': Number(event.target.getAttribute('data-col')),
            })
        }
    }

    const generateBlock = (row, col) => {
        if(index + 1 < data.products.length && data.products[index + 1].row === row + 1 && data.products[index + 1].col === col + 1){
            index += 1
            return  productPos && arena === productPos.arena && productPos.row === row + 1 && productPos.col === col + 1 ? (
                    <Paper 
                        className={`${classes.block} ${classes.product}`} 
                        component={veiw ? Link : "span"}
                        key={row * data.cols + col}
                        title={veiw && data.products[index].product_id}
                        to={`/transaction/${data.products[index].product_id}`}
                        style={veiw && {cursor: 'pointer'}}
                    />) : (
                        <Paper 
                        className={`${classes.block} ${classes.filled}`} 
                        component={veiw ? Link : "span"}
                        key={row * data.cols + col}
                        title={veiw && data.products[index].product_id}
                        to={`/transaction/${data.products[index].product_id}`}
                        style={veiw && {cursor: 'pointer'}}
                    />)
        } else {
            return (pos && row + 1 === pos.row && col + 1 === pos.col) ? (
                    <Paper 
                        className={`${classes.block} ${classes.selected }`} 
                        component="span" 
                        key={row * data.cols + col}
                        onClick={handleRowCol}
                        data-row={row + 1}
                        data-col={col + 1}
                        ref={selected}
                    /> ) : (
                    <Paper 
                        className={`${classes.block}`} 
                        component="span" 
                        key={row * data.cols + col}
                        onClick={handleRowCol}
                        style={veiw && {cursor: 'default'}}
                        data-row={row + 1}
                        data-col={col + 1}
                    /> )
        }
    }

    let index = -1

    return (
        loading ? <Skeleton variant="rect" height={500}/> :
        <Grow in={grow} timeout={750}>
            <Paper component="div" className={classes.root} >
                <Typography component="div" variant="h4" align="center" className={classes.arenaTitle}>Arena {data.location_id}</Typography>

                <Grid container className={classes.layout}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={11} ref={indexRow} className={classes.indexRow}>
                        {Array.from(Array(data.cols).keys()).map((col) => (
                            <Paper className={classes.index} component="span" key={col}>{col + 1}</Paper>
                        ))}
                    </Grid>
                    <Grid item xs={1} ref={indexCol} className={classes.indexCol}>
                        {Array.from(Array(data.rows).keys()).map((row) => (
                            <Paper className={classes.index} component="span" key={row}>{row + 1}</Paper>
                        ))}
                    </Grid>
                    <Grid item xs={11} className={classes.arena} ref={arenaLayout} onScroll={handleScroll}>
                        <Grid container  >
                            {Array.from(Array(data.rows).keys()).map((row) => {
                                return (
                                    <Grid item xs={12} key={row}>
                                        {Array.from(Array(data.cols).keys()).map((col) => (
                                            generateBlock(row, col)
                                        ))}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>
        </Grow>
    )
}

export default Arena