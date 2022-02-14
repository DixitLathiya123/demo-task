import { Box, FormGroup, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import { useForm } from "react-hook-form";
import CustomTextField from "../../components/common/CustomTextField";
import CustomButton from "../common/CustomButton";
import { ApiPost } from "../../helpers/Api/ApiData";

const useStyles = makeStyles((theme) => ({
  CustomModal: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(229,229,229,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    maxWidth: "700px",
    padding: [[22, 26, 46, 33]],
    outline: "none",
    width: "90%",
  },
  modalHeader: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    paddingBottom: "8px",

    "& img": {
      cursor: "pointer",
    },
  },
  closeIcon: {
    cursor: "pointer",
  },
  modalBody: {
    display: "block",

    "& h1 ": {
      fontWeight: 500,
      fontSize: 24,
      lineHeight: 1,
      margin: "0px",
      color: "#111111",
      paddingBottom: "30px",
    },

    "& table": {
      width: "100%",
      borderCollapse: "collapse",
      [theme.breakpoints.down("xs")]: {
        width: "500px",
        overflow: "scroll",
        height: "120px",
      },

      "& thead": {
        borderBottom: "1px solid rgba(127, 196, 174, 0.5)",
        height: "50px",
        "& tr": {
          "& th": {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: 1,
            color: "#111111",
            textAlign: "start",

            "&last-Child": {
              width: "163px",
            },
          },
        },
      },

      "& tbody": {
        "& tr:last-Child": {
          borderBottom: "none",
          "&:hover": {
            borderBottom: "none",
          },
        },
        "& tr": {
          borderBottom: "1px solid rgba(127, 196, 174, 0.5)",
          height: "50px",

          "& td": {
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "24px",
            "&:last-Child": {
              width: "163px",
            },
          },
        },
      },
    },
  },
  MonyTransferredModal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "500px",
    padding: [[28, 24, 48, 57]],
    outline: "none",
  },
  MonyTransferredModalBody: {
    paddingRight: "33px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "& img": {
      padding: [[20, 0, 29]],
    },
  },
  error: {
    display: "flex",
    alignItems: "center",
    paddingTop: "5px",
    fontSize: "12px",
    "& svg": {
      paddingRight: "5px",
    },
  },
  content: {
    "& h4": {
      fontWeight: 500,
      fontSize: 24,
      lineHeight: "28px",
      textAlign: "center",
      color: "#111111",
      padding: [[0, 24, 0]],
    },
    "& h5": {
      fontWeight: 400,
      fontSize: 19,
      lineHeight: "28px",
      textAlign: "center",
      color: " rgba(17, 17, 17, 0.7)",
      margin: "0px",
      padding: [[0, 24, 0]],
    },

    "& p": {
      fontWeight: "normal",
      fontSize: 16,
      lineHeight: "28px",
      color: "rgba(17, 17, 17, 0.7)",
      paddingTop: "45px",
      margin: "0px",
    },
  },
}));

function ModalComponent({ createOrderStatus, handleClose }) {
  const classes = useStyles();

  const { handleSubmit, errors, control } = useForm({ mode: "all" });

  const onSubmit = async (data) => {
    try {
      await ApiPost("create-product", data);
      handleClose("apicall")
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("createOrderStatus", createOrderStatus)
  return (
    <div>
      <Modal
        className={classes.CustomModal}
        open={createOrderStatus}
        onClose={handleClose}
        closeAfterTransition
      >
        <div className={classes.MonyTransferredModal}>
          <div className={classes.modalHeader}>
            <CloseIcon
              className={classes.closeIcon}
              width={22}
              height={22}
              onClick={handleClose}
            />
          </div>
          <div className={classes.MonyTransferredModalBody}>
            <div className={classes.content}>
              <h4>Create Order!</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <CustomTextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    control={control}
                    rules={
                      ("name",
                      {
                        required: "Product name is required",
                      })
                    }
                    type="text"
                    variant="filled"
                    autoComplete="false"
                  />
                  {errors.name && (
                    <Box className={classes.error} color="error.main">
                      <InfoIcon />
                      {errors.name.message}
                    </Box>
                  )}
                </FormGroup>
                <FormGroup>
                  <CustomTextField
                    fullWidth
                    label="Product Price"
                    name="price"
                    control={control}
                    rules={
                      ("price",
                      {
                        required: "Product price is required",
                      })
                    }
                    type="number"
                    variant="filled"
                    autoComplete="false"
                  />
                  {errors.price && (
                    <Box className={classes.error} color="error.main">
                      <InfoIcon />
                      {errors.price.message}
                    </Box>
                  )}
                </FormGroup>
                <CustomButton
                  type="Submit"
                  bgColor="#008b5e"
                  bordercolor="#008b5e"
                  fontColor="#ffffff"
                  radius="50"
                  btnPadding="15px 40"
                >
                  Create
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
