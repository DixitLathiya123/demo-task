import React from 'react'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import errorImg from "../../assets/images/Error-img.svg"

const useStyles = makeStyles((theme) => ({
    errorWrap: {
        minHeight: "calc(100vh - 177px)",
        display: "flex",
        alignItems: "center",
    },
    errorInfo: {
        "& h2": {
            fontSize: 24,
            fontWeight: 700,
            lineHeight: '1.5',
            color: "#022435",
            paddingBottom:'9px',
        },
        "& h3": {
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '28px',
            color: "rgba(17, 17, 17, 0.7)",
            "& span":{
                color:'#04B078;'
            }
        },
        
       
    },
    errorImg:{
        display:'block',
        paddingBottom:'23px',
        "& img": {
            width:'350px',
            minHeight:'245px'
        },
    }
}));

export default function NotFound() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.errorWrap}>
                <Container>
                    <Grid container >
                        <Grid item xs={12}>
                            <div className={classes.errorInfo} align="center">
                                <div  className={classes.errorImg}>
                                    <img src={errorImg} alt="errorImage" />
                                </div>
                                <Typography variant="body1" component="h2">Oops! Seems you lost your way.</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>

        </>
    )
}
