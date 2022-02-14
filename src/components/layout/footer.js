import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=> ({
    footer: {
        padding: [[20, 37]],
        display: 'flex',
        background: '#111',
        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            padding: 20,
        },

    },
    termsServiceBox: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            right: 20,
            top: 20,
        },

        [theme.breakpoints.down(350)]:{
            right:'5px',
        },

        '& ul': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',

            '& li': {
                display: 'flex',
                flexWrap: 'wrap',
                marginLeft: 12,
                cursor:'pointer',
                marginRight: '3px',

                [theme.breakpoints.down('lg')]: {
                    marginLeft: 6,
                },

                "& img": {

                    [theme.breakpoints.down('lg')]: {
                        maxWidth: '20px'
                    },

                },

                "& a": {
                    display: 'flex',
                    flexWrap: 'wrap',
                    fontSize: 14,
                    color: '#fff',
                    lineHeight: '24px',
                    
                    [theme.breakpoints.down('lg')]: {
                        fontSize: 12,
                        lineHeight: '20px',
                    },
                    [theme.breakpoints.down(350)]:{
                        fontSize:10,
                    },

                }

            }

        }

    },
    ProudlyText: {
        display: 'block',
        textAlign: 'right',
        fontSize: 12,
        lineHeight: '14px',
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 12,
        
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            right: 20,
            top: 50,
            marginTop: 0,
        },

    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <div className={classes.termsServiceBox}>
                        <ul>
                            <li><Link to="#" target="__blank">Terms & Conditions</Link></li>
                            <li><Link to="#" target="__blank">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className={classes.ProudlyText}>Proudly made for India</div>
                </Grid>
            </Grid>
        </div>
    )
}
