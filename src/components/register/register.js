import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { ApiPostNoAuth } from "../../helpers/Api/ApiData";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    loginSignUpWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        "& MuiGrid-item": {
            width: "100%",
        },
        minHeight: "752px"
    },
    loginSignUpBox: {
        height: "100%",
        backgroundColor: "#fff",
        padding: [[30, 30]],
        display: "flex",
        borderRadius: 0,
        "& .MuiSvgIcon-root": {
            cursor: "pointer",
        },
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
            fontSize: 14,
            color: "#111111",
            lineHeight: 1.2,
            padding: 0,
        },
        "& .MuiInputLabel-outlined": {
            transform: "translate(15px, 12px) scale(1)",
            [theme.breakpoints.down("xs")]: {
                transform: "translate(15px, 15px) scale(1)",
            },
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
                    fontSize: 14,
                    padding: [[15, 15]],
                },
            },
        },
        "& .MuiButton-root": {
            width: "250px",
            borderRadius: 40,
            margin: "0px auto",

            "& span": {
                fontSize: 20,
                lineHeight: 1,
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
        paddingTop: "90px",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    newRegister: {
        textAlign: "center",
        fontSize: 14,
        color: "#111",
        fontWeight: 400,
        marginTop: -10,
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
    radioWant: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15,
        alignItems: "center",

        "& .MuiFormLabel-root": {
            width: 100,
        },

        "& .MuiFormGroup-row": {
            marginBottom: 0,
            width: "calc(100% - 100px)",
            [theme.breakpoints.down("sm")]: {
                width: "calc(100% - 30px)",
            },
        },

        "& .MuiFormControlLabel-root": {
            marginRight: 40,
            [theme.breakpoints.down("xs")]: {
                marginRight: 30,
            },
        },

        "& .MuiFormControlLabel-label": {
            fontSize: 14,
            [theme.breakpoints.down("xs")]: {
                fontSize: 16,
            },
        },

        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
    loginSignUpForm: {
        display: "flex",
        width: "100%",
        maxWidth: 524,
        margin: "0 auto",
        "& .MuiSvgIcon-root": {
            cursor: "pointer",
        },
        "& form": {
            width: "100%",
            display: "block",
        },
    },
    passwordIcon: {
        verticalAlign: "middle",
        marginRight: 4,
        "& svg": {
            fontSize: "1.5rem",
        },
    },
    firstNameTExtField: {
        "& .MuiFormControl-root": {
            marginBottom: "0px",
        },
        "& MuiBox-root": {
            marginTop: "0px",
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "-4px !important",
        },
    },
    "& .MuiFormGroup-root": {
        marginBottom: 20,
    },

    "& .MuiFormLabel-root": {
        fontSize: 14,
        color: "#111111",
        lineHeight: 1.2,
        padding: 0,
    },
    "& .MuiInputLabel-outlined": {
        transform: "translate(15px, 12px) scale(1)",
        [theme.breakpoints.down("xs")]: {
            transform: "translate(15px, 15px) scale(1)",
        },
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
                fontSize: 14,
                padding: [[15, 15]],
            },
        },
    },
}));

export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const { handleSubmit, errors, control, watch, reset } = useForm({ mode: "all" });
    const password = useRef({});
    password.current = watch("password", "");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (data) => {
        setLoader(true);
        await ApiPostNoAuth(`register`, { ...data })
        .then((res) => {
            if (res.data) {
                setLoader(false);
                toast.success(res.data.message, {
                    autoClose: 5000,
                    hideProgressBar: true,
                });
                reset();
                history.push("/login")
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

    const validateName = async (name) => {
        const regex = /^[A-Za-z]+\s*$/i;
        if (!regex.test(name)) {
            return "Invalid input";
        } else if (name.trim().length < 3) {
            return "Please enter at least 3 characters";
        }
    };

    return (
        <>
            <div className={classes.loginSignUpWrap}>
                    <>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6}>
                                    <div className={classes.loginSignImg}>
                                        <img src={signinImg} alt="signInImage" />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <div className={classes.loginSignUpBox}>
                                        <div className={classes.loginSignUpArrow}>
                                        </div>
                                        <div className={classes.loginSignUpForm}>
                                            <form
                                                onSubmit={handleSubmit(onSubmit)}
                                                className={classes.FormloginSignUp}
                                            >
                                               
                                               <h2>Sign up to create an account </h2>
                                                <Grid container spacing={3}>
                                                    <Grid item md={6} sm={6} xs={12}>
                                                        <FormGroup className={classes.firstNameTExtField}>
                                                            <CustomTextField
                                                                defaultValue=""
                                                                fullWidth
                                                                name="first_name"
                                                                type="text"
                                                                label="First Name"
                                                                variant="outlined"
                                                                autoComplete="false"
                                                                control={control}
                                                                rules={{
                                                                    required: "First name is required",
                                                                    minLength: 3,
                                                                    validate: async (value) =>
                                                                        await validateName(value),
                                                                }}
                                                                className={errors.first_name && classes.error}
                                                            />
                                                            {errors.first_name && (
                                                                <Box
                                                                    className={classes.error}
                                                                    color="error.main"
                                                                >
                                                                    <InfoOutlined />
                                                                    {errors.first_name.type === "minLength"
                                                                        ? "Please enter at least 3 characters"
                                                                        : errors.first_name.message}
                                                                </Box>
                                                            )}
                                                        </FormGroup>
                                                    </Grid>
                                                    <Grid item md={6} sm={6} xs={12}>
                                                        <FormGroup>
                                                            <CustomTextField
                                                                defaultValue=""
                                                                fullWidth
                                                                name="last_name"
                                                                type="text"
                                                                label="Last Name"
                                                                variant="outlined"
                                                                autoComplete="false"
                                                                control={control}
                                                                rules={{
                                                                    required: "Last name is required",
                                                                    minLength: 3,
                                                                    validate: async (value) =>
                                                                        await validateName(value),
                                                                    // pattern: {
                                                                    //     value: /^[A-Za-z]+\s*$/i,
                                                                    //     message: "Invalid input"
                                                                    // }
                                                                }}
                                                                className={errors.last_name && classes.error}
                                                            />
                                                            {errors.last_name && (
                                                                <Box
                                                                    className={classes.error}
                                                                    color="error.main"
                                                                >
                                                                    <InfoOutlined />
                                                                    {errors.last_name.type === "minLength"
                                                                        ? "Please enter at least 3 characters"
                                                                        : errors.last_name.message}
                                                                </Box>
                                                            )}
                                                        </FormGroup>
                                                    </Grid>
                                                </Grid>
                                                <FormGroup>
                                                    <CustomTextField
                                                        defaultValue=""
                                                        fullWidth
                                                        name="email"
                                                        type="email"
                                                        label="Email"
                                                        variant="outlined"
                                                        autoComplete="false"
                                                        control={control}
                                                        rules={{
                                                            required: "Email is required",
                                                            pattern: {
                                                                value:
                                                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: "Please enter valid email address",
                                                            },
                                                        }}
                                                        className={errors.email && classes.error}
                                                    />
                                                    {errors.email && (
                                                        <Box className={classes.error} color="error.main">
                                                            <InfoOutlined />
                                                            {errors.email.message}
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
                                                                        className={classes.passwordIcon}
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
                                                        autoComplete="false"
                                                        control={control}
                                                        rules={{
                                                            required: "Password is required",
                                                            pattern: {
                                                                value:
                                                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                                                                message:
                                                                    "Minimum eight characters, at least one letter, one number and one special character",
                                                            },
                                                        }}
                                                        className={errors.password && classes.error}
                                                    />
                                                    {errors.password && (
                                                        <Box className={classes.error} color="error.main">
                                                            <InfoOutlined />
                                                            {errors.password.message}
                                                        </Box>
                                                    )}
                                                </FormGroup>
                                                <FormGroup>
                                                    <CustomTextField
                                                        defaultValue=""
                                                        fullWidth
                                                        type={repeatPasswordVisible ? "text" : "password"}
                                                        name="confirm_password"
                                                        label="Confirm Password"
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconButton
                                                                        className={classes.passwordIcon}
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() =>
                                                                            setRepeatPasswordVisible(
                                                                                !repeatPasswordVisible
                                                                            )
                                                                        }
                                                                    >
                                                                        {repeatPasswordVisible ? (
                                                                            <Visibility />
                                                                        ) : (
                                                                            <VisibilityOff />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        autoComplete="false"
                                                        control={control}
                                                        rules={{
                                                            required: "Confirm password is required",
                                                            validate: (value) =>
                                                                value === password.current ||
                                                                "The passwords do not match",
                                                        }}
                                                        className={errors.confirm_password && classes.error}
                                                    />
                                                    {errors.confirm_password && (
                                                        <Box className={classes.error} color="error.main">
                                                            <InfoOutlined />
                                                            {errors.confirm_password.message}
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
                                                            bgColor="#008b5e"
                                                            bordercolor="#008b5e"
                                                            fontColor="#ffffff"
                                                            radius="0"
                                                            btnPadding="15"
                                                        >
                                                            Register
                                                        </CustomButton>
                                                    )}
                                                </FormGroup>
                                                <div className={classes.newRegister}>
                                                    Already have an account?{" "}
                                                    <Link
                                                        to={{ pathname: "/login" }}
                                                    >
                                                        Login
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                    </>
            </div>
        </>
    );
}
