import React from 'react'
import { withStyles, Button } from '@material-ui/core'

export default function CustomButton({ bordercolor, fontColor, width, radius, boxShadow, children, bgColor, fontSize, btnPadding, transform, resBtnWidth, ...props }) {
    const StyledButton = withStyles(theme => ({
        root: {
            border: `1px solid ${bordercolor}`,
            padding: btnPadding ? `${btnPadding}px` : 20,
            borderRadius: `${radius}px`,
            boxShadow: boxShadow ? `${boxShadow}` : 'none',
            letterSpacing: "normal",
            [theme.breakpoints.down('sm')]: {
                minWidth: 'auto',
            },
            background: bgColor,
            '&:hover': {
                background: bgColor ? bgColor : bordercolor !== '#fff' ? `${bordercolor}` : `rgba(255, 255, 255, .3)`,
                '& .MuiButton-label': {
                    color: fontColor
                }
            },
            '&:disabled': {
                color: '#ffffff !important',
                backgroundColor: '#d0e5de !important',
                borderColor: '#d0e5de'
            }
        },
        label: {
            textTransform: transform || 'capitalize',
            fontSize: fontSize ? `${fontSize}px` : 16,
            [theme.breakpoints.down('sm')]: {

            },
            lineHeight: '1',
            color: fontColor ? fontColor : '#fff',
        },

    }))(Button);

    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    )
}
