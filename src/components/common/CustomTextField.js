import React from "react";
import { Controller } from "react-hook-form";
import { withStyles, TextField } from "@material-ui/core";

const StyledTextField = withStyles((theme) => ({
  root: {
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 22px) scale(1)",
      [theme.breakpoints.down('xs')]:{
        transform: "translate(14px, 17px) scale(1)",
      },
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -8px) scale(1)',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 12,
        color: '#111111',
        opacity: '50%'
      },
    },
    "& .MuiInputLabel-root": {
      color: "#111111"
    },
    "& .MuiInputBase-formControl": {
      backgroundColor: "transparent",
      borderRadius: 5,
      paddingRight: 0,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DFDFDF",
        padding: [[0, 17]],
        "& span": {
          paddingLeft: 14,
          paddingRight: 14
        }
      },
      "& .MuiInputAdornment-positionStart": {
        position: 'absolute',
        right: '3px',
        top: '50%',
        transform: 'translateY(-50%)',
        marginTop:'0 !important',
      },
      "&.MuiOutlinedInput-multiline": {
        padding: 0
      },
      "&.MuiInput-underline": {
        "&:before": {
          borderColor: "#77CEB2"
        },
        "&:after": {
          borderColor: "#77CEB2"
        },
        "& .MuiInputBase-input": {
          padding: [[10, 10]],
          fontSize: 14,
          backgroundColor: "rgba(0,0,0,0)"
        }
      }
    },
    "& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after": {
      content: "normal",
    },
    "& .MuiInputBase-input": {
      color: "#111111",
      fontSize: 20,
      padding: "16px 17px",
      backgroundColor: "#fff",
      borderRadius: 5,
      border: "1px solid transparent",
      height: 'auto',
      [theme.breakpoints.down('xs')]: {
        fontSize: '16px ',
        padding:'15px 15px ',
    },
      "&:-webkit-autofill": {
        animation: "none !important",
      },
      "&::placeholder": {
        color: "#111111",
        opacity: 0.3,
      },
      "& .input:-internal-autofill-selected": {
        backgroundColor: "#F0F0F0 !important",
      },
    },
    "& .MuiInputBase-root": {
      "& .MuiInputAdornment-positionEnd": {
        paddingRight: theme.spacing(1) + 2,
        color: "#666666",
      },
    },
    "& .MuiOutlinedInput-root.Mui-error": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#f00",
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DFDFDF",
        borderWidth: 1,
      },
    },
  },
}))(TextField);


export default function CustomTextField(props) {
  if(props.control) {
      return <Controller as={StyledTextField} {...props} />
  }else{
      return <StyledTextField {...props} />
  }
}
