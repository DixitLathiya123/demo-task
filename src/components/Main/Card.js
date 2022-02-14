import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import productImage from "../../assets/images/product.jpg";
import { ApiGet, ApiPost } from "../../helpers/Api/ApiData";
import Auth from "../../helpers/auth";
import ModalComponent from "../Modal";

const useStyles = makeStyles((theme) => ({
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
  readMore: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#008B5E",
    marginTop: "28px",
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

export default function PODCard({ setCreateOrderStatus, createOrderStatus }) {
  const [allProduct, setAllProduct] = useState([]);
  const classes = useStyles();
  const userData = Auth.getUserData();

  const getData = async () => {
    const data = await ApiGet("get-product");
    setAllProduct(data.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const confirmOrder = async (id) => {
    const result = window.confirm("Are you sure you want to order ?");
    if (result) {
      try {
        await ApiPost("create-order", { _id: id });
        getData();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleClose = (apicall) => {
    setCreateOrderStatus(false);
    if (apicall) getData();
  };

  return (
    <>
    {createOrderStatus && <ModalComponent createOrderStatus={createOrderStatus} handleClose={handleClose} />}
      {allProduct.map((item) => {
        return (
          <Grid item lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} image={productImage} />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5">
                    {item.name}
                  </Typography>
                  <Typography variant="body3" className={classes.cardContent}>
                    {item.price}
                  </Typography>
                  {!item.ordered.includes(userData._id) ? (
                    <Typography
                      component="div"
                      className={classes.readMore}
                      onClick={() => confirmOrder(item._id)}
                    >
                      Order
                    </Typography>
                  ) : (
                    <Typography component="div" className={classes.readMore}>
                      Ordered
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}
