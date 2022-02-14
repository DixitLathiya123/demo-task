import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    commonLayoutWrap: {
        paddingBottom: 100,
        paddingTop: 80,
        minHeight: 'calc(100vh - 172px)'
    },
    commonLayoutInner: {
        backgroundColor: "rgba(239, 255, 250, 0.5)",
        padding: [[70, 55]],
        maxWidth: 945,
        margin: "0 auto",
        [theme.breakpoints.down('xs')]:{
            padding: [[70, 0]],
        },
    },
}));

export default function CommonLayout({ children, ...props }) {
    const classes = useStyles();
    return (
        <div className={classes.commonLayoutWrap} {...props}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.commonLayoutInner}>
                            {children}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
