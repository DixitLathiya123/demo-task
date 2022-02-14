import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Grid, List, ListItem, IconButton } from '@material-ui/core';
import Auth from '../../helpers/auth';
import "../../assets/css/style.css";
import clsx from 'clsx';
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    header: {
        minHeight: 85,
        [theme.breakpoints.down('xs')]: {
            minHeight: 68
        }
    },
    active: {
        color: '#008B5E',
        "&:before": {
            content: "''",
            borderBottom: '1px solid #008B5E',
            position: 'absolute',
            left: '18px',
            bottom: '5px',
            right: '18px',
        }
    },
    headerWrap: {
        padding: [[20, 60]],
        position: 'relative',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 99,
        borderBottom: '1px solid #EFEFEF',
        backgroundColor: '#F2FFFB',
        boxShadow: '0px -1px 4px #b3e3d6',

        [theme.breakpoints.down('sm')]: {
            padding: [[20]],
        },

        [theme.breakpoints.down('xs')]: {
            padding: [[10, 20]]
        },

    },
    mainGrid:{
        maxWidth:'1280px',
        margin:'auto'
    },
    siteLogo: {
        position: "relative",

        "& a": {
            display: 'block',
            width: 75,
            [theme.breakpoints.down('sm')]: {
                width: 60,
            },

            "& img": {
                maxWidth: '100%',
                display: 'block',
            }
        }

    },
    menuButton: {
        display: 'none',

        [theme.breakpoints.down('sm')]: {
            display: 'block',
            marginLeft: 'auto'
        },

    },
    mainMenu: {
        display: "flex",
        justifyContent: "flex-end",
        padding: 0,

        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            left: 0,
            top: 88,
            right: 0,
            justifyContent: 'flex-start',
            display: 'none',
            backgroundColor: '#F2FFFB',
        },

        [theme.breakpoints.down('xs')]: {
            top: 68,
        },

        "& .MuiListItem-root": {
            width: "auto",
            padding: 0,

            [theme.breakpoints.down('sm')]: {
                padding: [[12, 20]],
                display: 'block',
            },

            "& a": {
                display: 'block',
                padding: [[12, 16]],
                lineHeight: 1,
                fontWeight: 500,

                [theme.breakpoints.down('sm')]: {
                    padding: [[0]],
                },

                '&:hover': {
                    color: '#008B5E',

                    "&:before": {
                        content: "''",
                        borderBottom: '1px solid #008B5E',
                        position: 'absolute',
                        left: '18px',
                        bottom: '5px',
                        right: '18px',
                    }

                }

            },

            "& .MuiPaper-root": {
                marginTop: 12,
                background: '#fff',
                borderRadius: 0,
                minWidth: 113,
                marginLeft: '-69px',
                [theme.breakpoints.down('sm')]: {
                    marginLeft: '0',
                },

                '&::before': {
                    content: '""',
                    position: 'absolute',
                    right: 12,
                    top: 2,
                    borderStyle: 'solid',
                    borderWidth: '0px 10px 12px 10px',
                    borderColor: 'transparent transparent #fff transparent',

                },

                '& .MuiList-root': {
                    padding: [[10, 0]],

                    "& li": {
                        padding: [[10, 20]],
                        cursor: 'pointer',
                        lineHeight: 1,

                        '& a': {
                            padding: 0,
                            fontSize: 16,
                            lineHeight: 1,
                            display: 'block',
                        }

                    }

                }

            }


        }
    },
    OpenMenu: {
        display: 'block',
    },
    userButton: {
        width: 40,
        height: 40,
        background: '#000',
        borderRadius: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        color: '#fff',
        textTransform: 'uppercase',
        padding: 0,
        marginLeft: 20,
        minWidth: 'inherit',
        position: 'relative',

        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },

        "& span": {
            lineHeight: 1,
        },

        '&:hover': {
            background: '#000'
        }

    }
}));


const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const pathName = history.location.pathname
    const [userData, setUserData] = useState(Auth.getUserData())
    console.log("userData",userData)

    const onStorageChange = () => {
        const userData = Auth.getUserData();
        setUserData(userData);
    }

    useEffect(() => {
        Auth.addSubscriber("userInfo", onStorageChange);
        return () => {
            Auth.clearAllSubscriptions();
        };
    }, [userData]);

    const headerRef = useRef();
    const  handleMenuKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenDrawerHandler(false)
        }
    }

    const [openDrawerHandler, setOpenDrawerHandler] = useState(false);

    useEffect(() => {
        document.addEventListener("click", handleCloseToggleMenu);
        return () => {
            document.removeEventListener("click", handleCloseToggleMenu);
        }
    }, [])

    const handleCloseToggleMenu = (e) => {
        if (headerRef.current && !headerRef.current.contains(e.target)) {
            setOpenDrawerHandler(false)
        }
    }

    return (
        <div className={classes.header}>
        <div className={classes.headerWrap} ref={headerRef} >
            <Grid container alignItems="center" className={classes.mainGrid}>
                <Grid item xs={3}>
                    <div className={classes.siteLogo}>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpenDrawerHandler(!openDrawerHandler)}
                        onKeyDown={handleMenuKeyDown}
                    >
                        <MenuIcon />
                    </IconButton>

                        <List className={openDrawerHandler ? clsx(classes.mainMenu, classes.OpenMenu) : classes.mainMenu} component="ul">
                            {!userData ? <><ListItem><Link to={{pathname:"/login"}} className={pathName === "/login" ? classes.active : ''} >Login</Link></ListItem>
                            <ListItem><Link to={{pathname:"/register"}} className={pathName === "/register" ? classes.active : ''} >Register</Link></ListItem></> : 
                            <>
                             <ListItem><Link to={{pathname:"/home"}} className={pathName === "/home" ? classes.active : ''} >Home</Link></ListItem>
                             <ListItem><Link to={{pathname:"/order"}} className={pathName === "/order" ? classes.active : ''} >My Order</Link></ListItem>
                             <ListItem><Link to={{pathname:"/logout"}} className={pathName === "/logout" ? classes.active : ''} >logout</Link></ListItem>
                            </>
                             }
                        </List>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(Header)