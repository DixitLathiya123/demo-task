import React, { useState } from "react";
import {
  FormGroup,
  Grid,
  makeStyles,
  Box,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import CustomTextField from "../common/CustomTextField";
import CustomButton from "../common/CustomButton";
import { Link } from "react-router-dom";
import { InfoOutlined } from "@material-ui/icons";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import signinImg from "../../assets/images/signin-img.svg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ApiPostNoAuth } from "../../helpers/Api/ApiData";
import { toast } from "react-toastify";
import Auth from "../../helpers/auth";

const useStyles = makeStyles((theme) => ({
  loginSignUpWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    "& MuiGrid-item": {
      width: "100%",
    },
    minHeight: "752px",
  },
  loginSignUpBox: {
    height: "100%",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: 0,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    "& h2": {
      marginBottom: 20,
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 1,
      color: "#111111",
    },

    "& .MuiFormGroup-root": {
      marginBottom: 20,
    },

    "& .MuiFormLabel-root": {
      // color: "#000",
      fontSize: 14,
      color: "#111111",
      lineHeight: 1.2,
      padding: 0,
      [theme.breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(15px, 15px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(15px, -8px) scale(1)",
      backgroundColor: "#fff",
      fontSize: 12,
      padding: [[0, 11]],
      color: "rgba(17, 17, 17, 0.5)",
    },
    "& .MuiInputBase-formControl": {
      "& .MuiOutlinedInput-input": {
        padding: [[12, 15]],
        fontSize: 14,
        [theme.breakpoints.down("xs")]: {
          fontSize: 16,
          padding: [[15, 15]],
        },
      },
    },
    "& .MuiButton-root": {
      maxWidth: "250px",
      width: "100%",
      borderRadius: 40,
      margin: "0px auto",
      [theme.breakpoints.down(281)]: {
        width: 200,
      },
      "& span": {
        fontSize: 20,
        lineHeight: 1,
        [theme.breakpoints.down(360)]: {
          fontSize: 18,
        },
      },
    },
  },
  loginSignImg: {
    height: "calc(100%)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(252, 252, 252, 0.5)",
    paddingTop: "100px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  newRegister: {
    textAlign: "center",
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 400,
    marginTop: "-10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
    "& a": {
      color: "#008b5e",
      fontWeight: 700,
    },
  },
  error: {
    fontSize: 12,
    lineHeight: 1,
    display: "flex",
    marginTop: 5,
    "& svg": {
      fontSize: 14,
      verticalAlign: "middle",
      marginRight: 4,
    },
    "& .MuiInputBase-formControl": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DD6161",
      },
    },
  },
  VisibleIcon: {
    verticalAlign: "middle",
    marginRight: 4,
    "& svg": {
      fontSize: "1.5rem",
    },
  },
  loginSignUpForm: {
    width: "100%",
    maxWidth: 524,
    margin: "0 auto",
    "& .MuiSvgIcon-root": {
      cursor: "pointer",
    },
  },
  [theme.breakpoints.up("sm")]: {
    switchDesktop: {
      display: "none",
    },
  },

  [theme.breakpoints.down("sm")]: {
    switchDesktop: {
      backgroundColor: "#FFDF8D",
      padding: [[15, 20, 15]],
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",

      "& span": {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1,
        marginRight: "auto",
      },

      "& .MuiSvgIcon-root": {
        background: "#fff",
        borderRadius: "50%",
      },
    },
  }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { handleSubmit, errors, control, reset } = useForm({ mode: "all" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    setLoader(true);
    await ApiPostNoAuth(`login`, { ...data })
      .then((res) => {
        console.log("res",res)
        if (res.data.data) {
          setLoader(false);
          Auth.setAuthToken(res.data.token);
          Auth.setUserData(res.data.data);
          toast.success(res.data.message, {
            autoClose: 5000,
            hideProgressBar: true,
          });
          reset();
          history.push("/login");
        } else {
          toast.error(res.data.message, {
            autoClose: 5000,
            hideProgressBar: true,
          });
          setLoader(false);
        }
      })
      .catch((err) => {
        toast.error(err.message, { autoClose: 5000, hideProgressBar: true });
        setLoader(false);
      });
  };

  return (
    <>
      <div className={classes.loginSignUpWrap}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.loginSignImg}>
              <img src={signinImg} alt="signUpImage" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.loginSignUpBox}>
              <div className={classes.loginSignUpForm}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <CustomTextField
                      defaultValue=""
                      type="text"
                      name="email"
                      fullWidth
                      label="Email"
                      variant="outlined"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      className={errors?.email && classes.error}
                    />
                    {errors?.email && (
                      <Box className={classes.error} color="error.main">
                        <InfoOutlined />
                        {errors.email?.message}
                      </Box>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <CustomTextField
                      defaultValue=""
                      fullWidth
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      label="Password"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              className={classes.VisibleIcon}
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            >
                              {passwordVisible ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      control={control}
                      rules={{
                        required: "Password is required",
                      }}
                      className={errors?.password && classes.error}
                    />
                    {errors?.password && (
                      <Box className={classes.error} color="error.main">
                        <InfoOutlined />
                        {errors.password?.message}
                      </Box>
                    )}
                  </FormGroup>
                  <FormGroup>
                    {loader ? (
                      <CustomButton
                        bgColor="#008b5e"
                        bordercolor="#008b5e"
                        fontColor="#ffffff"
                        radius="0"
                        btnPadding="15"
                      >
                        <CircularProgress color="inherit" size={16} />
                      </CustomButton>
                    ) : (
                      <CustomButton
                        type="submit"
                        bgColor="#008B5E"
                        bordercolor="#008B5E"
                        fontColor="#ffffff"
                        radius="0"
                        btnPadding="15"
                      >
                        Login
                      </CustomButton>
                    )}
                  </FormGroup>
                </form>
                <div className={classes.newRegister}>
                  New here? <Link to={{ pathname: "/register" }}>Sign Up</Link>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
