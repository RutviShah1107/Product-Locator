import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ReceiptIcon from '@material-ui/icons/Receipt'
import PersonIcon from '@material-ui/icons/Person'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import AssessmentIcon from '@material-ui/icons/Assessment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import AuthContext from '../../context/authContext'

import axios from 'axios'

const useStyle = makeStyles({
    brand: {
        'flex-grow': 1,
        'cursor': 'default'
    },
    drawer: {
        'background-color': '#303030',
        'color': 'white',
        'width': 200,
    },
    drawerHeader: {
        'display': 'flex',
        'justifyContent': 'flex-end',
    },
    ListItemIcon: {
        'color': 'rgb(197 197 197 / 54%)',
    },
    nestedList: {
        'padding-left': '3.5em',
    },
    nestedListItem: {
        'color': '#a5a5a5',
        'font-size': '0.95rem'

    }
})

const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const classes = useStyle()
    const open = Boolean(anchorEl)

    const history = useHistory(['key'])
    const [ , , removeCookies ] = useCookies()

    const { isAdmin } = useContext(AuthContext)

    const handleLogout = () => {    
        axios.post('http://127.0.0.1:8000/auth/logout/')
        .then((response) => {
            console.log(response.data)
            removeCookies('key', { 
                path: '/',
                secure: true,
                sameSite: "none", 
            })
            history.push("/")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const openDrawer = () => {
        setToggleDrawer(true)
    }

    const closeDrawer = () => {
        setToggleDrawer(false)
    }

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>

                    <Typography component="div" variant="h6" className={classes.brand}>Product Locator</Typography>

                    <IconButton onClick={openMenu} color="inherit">
                        <AccountCircleIcon />
                        <ExpandMoreIcon fontSize="small" />
                    </IconButton>

                    <Menu
                        getContentAnchorEl={null}
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={open}
                        onClose={closeMenu}
                    >
                        <MenuItem component={Link} to="/profile">
                            <ListItemIcon> <PersonIcon /> </ListItemIcon> 
                            Profile
                        </MenuItem>
                        <MenuItem component={Link} to="/password/change">
                            <ListItemIcon> <VpnKeyIcon /> </ListItemIcon>Change Password
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon> <ExitToAppIcon /> </ListItemIcon> Log Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer open={toggleDrawer} onClose={closeDrawer} anchor={"left"} classes={{ paper: classes.drawer }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={closeDrawer} color="secondary">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <Divider />

                <List onClick={closeDrawer}>
                    <div className="nav-item">
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemIcon className={classes.ListItemIcon}>
                                <ReceiptIcon color="inherit" />
                            </ListItemIcon>

                            <ListItemText primary="Transactions" />
                        </ListItem>

                        <List className={classes.nestedList}>
                            <ListItem button component={Link} to="/transaction/new">
                                <ListItemText primary="Add Transaction" classes={{ primary: classes.nestedListItem }} />
                            </ListItem>
                        </List>
                    </div>

                    <div className="nav-item">
                        <ListItem button component={Link} to="/arena/">
                            <ListItemIcon className={classes.ListItemIcon}>
                                <HomeWorkIcon />
                            </ListItemIcon>

                            <ListItemText primary="Arenas" />
                        </ListItem>
                        { isAdmin && 
                            <List className={classes.nestedList}>
                                <ListItem button component={Link} to="/arena/new/">
                                    <ListItemText primary="Add Arena" classes={{ primary: classes.nestedListItem }} />
                                </ListItem>
                            </List>
                        }
                        
                    </div>

                    {isAdmin && 
                        <div className="nav-item">
                            <ListItem>
                                <ListItemIcon className={classes.ListItemIcon}>
                                    <PersonIcon />
                                </ListItemIcon>

                                <ListItemText primary="Users" />

                            </ListItem>
                            <List className={classes.nestedList}>
                                <ListItem button component={Link} to="/user/new">
                                    <ListItemText primary="Add User" classes={{ primary: classes.nestedListItem }} />
                                </ListItem>
                            </List>
                        </div>
                    }
                    <div className="nav-item">
                        <ListItem button component={Link} to="/chart">
                            <ListItemIcon className={classes.ListItemIcon}>
                                <AssessmentIcon />
                            </ListItemIcon>

                            <ListItemText primary="Visuals" />
                        </ListItem>
                    </div>
                        
                    
                </List>

            </Drawer>
        </React.Fragment>
    )
}

export default Navbar