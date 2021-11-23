import React from 'react'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'


const useStyles = makeStyles({
    root: {
        'margin': '24px auto', 
        '& > div': {
            'min-height': '350px'
        }
    },
    tableHeader: {
        '& > tr > th': {
            'background-color': 'black',
            'color': 'white',
            'font-size': '1.1em'
        }
    },
    tableBody: {
        'min-height': '100px',
        '& > tr > td': {
            'padding': '5px',
            'font-size': '0.95rem'
        },
        '& tr:nth-child(even) > td': {
            'background-color': 'whitesmoke'
        }
    }
})

const Transactions = (props) => {

    const classes = useStyles()

    return (
        <Container maxWidth="lg" className={classes.root} >
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell align="center" width="22.5%">Product ID</TableCell>
                            <TableCell align="center" width="22.5%">Location ID</TableCell>
                            <TableCell align="center" width="25%">User ID</TableCell>
                            <TableCell align="right"  width="20%">Date</TableCell>
                            <TableCell align="center"  width="10%"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {props.rows.map((row) => (
                            <TableRow key={row.product_id}>
                                <TableCell align="center">{row.product_id}</TableCell>
                                <TableCell align="center">{row.location_id}</TableCell>
                                <TableCell align="center">{row.user_id}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" component={Link} to={`/transaction/${row.product_id}`}> 
                                        <EditIcon/> 
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                { props.loading ? <LinearProgress  /> : null}
            </TableContainer>
        </Container>
    )
}

export default Transactions