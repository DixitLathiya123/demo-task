import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";
import PODCard from "./Card";
import CustomButton from "../common/CustomButton";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "170px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: [[100, 0]],
      overflow: "hidden",
      position: "relative",
    },
    "& h4": {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      lineHeight: 1,
      letterSpacing: "0.3em",
      paddingBottom: "20px",
    },
    "& p": {
      fontWeight: "300",
      fontSize: "20px",
      lineHeight: "28px",
      textAlign: "center",
      width: "550px",
      margin: "0 auto",
      color: "rgba(17,17,17,0.7)",
      [theme.breakpoints.down("sm")]: {
        width: "initial",
      },
    },
  },
  cafeCardsBox: {
    display: "block",
    paddingTop: "60px",
  },
}));

export default function MediaCard() {
  const classes = useStyles();
  const [createOrderStatus, setCreateOrderStatus] = useState(false)

  const createOrder = () => {
    setCreateOrderStatus(true)
};

  return (
    <>
      <div className={classes.main}>
        <Container maxWidth="lg">
          <Typography variant="h4">Product List</Typography>
          <Typography variant="body1">
            You can bring your product here.
          </Typography>
          <div className={classes.cafeCardsBox}>
            <CustomButton
              type="submit"
              bgColor="#008B5E"
              bordercolor="#008B5E"
              fontColor="#ffffff"
              radius="0"
              marginBottom="10px"
              btnPadding="15"
              onClick={createOrder}
            >
              Create Product
            </CustomButton>
            <Grid container spacing={5}>
              <PODCard createOrderStatus={createOrderStatus} setCreateOrderStatus={setCreateOrderStatus} />
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}
