import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import productImage from "../../assets/images/product.jpg";
import { ApiGet } from "../../helpers/Api/ApiData";

const useStyles = makeStyles((theme) => ({
  podCafeMain: {
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
      color: "rgba(17,17,17,0.7)",
    },
  },
  root: {
    maxWidth: "340px",
    minHeight: "410px",
    borderRadius: "20px",
    cursor: "pointer",

    "& button": {
      "&:hover": {
        "& .MuiCardActionArea-focusHighlight": {
          opacity: 0,
        },
      },
    },

    "&:hover": {
      boxShadow: "0px 2px 8px 2px rgb(189 189 189 / 20%)",
    },
  },
  media: {
    height: "177px",
    width: "100%",
    marginBottom: "15px",
    backgroundPosition: "left center",
  },
  cafeCardsBox: {
    display: "block",
    paddingTop: "60px",
  },
  cardContent: {
    paddingTop: "8px",

    "& h5": {
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "24px",
      marginBottom: "12px",
      color: "#111111",
      height: "50px",
    },

    "& span": {
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      color: "rgba(17, 17, 17, 0.7)",
      display: "-webkit-box",
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
    },
  },
}));

function Order() {
  const [allProduct, setAllProduct] = useState([]);
  const classes = useStyles();

  const getData = async () => {
    const data = await ApiGet("my-order");
    setAllProduct(data.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.podCafeMain}>
      <Container maxWidth="lg">
        <Typography variant="h4">Product List</Typography>
        <Typography variant="body1">
          You can bring your product here.
        </Typography>
        <div className={classes.cafeCardsBox}>
          <Grid container spacing={5}>
            {allProduct.map((item) => {
              return (
                <Grid item lg={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={productImage}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body3"
                          className={classes.cardContent}
                        >
                          {item.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default Order;
