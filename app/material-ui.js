import { Button, Fab, TextField, Checkbox, TableRow, Card, Tooltip, LinearProgress, ListItem } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'
import { grey, green, red, teal, brown } from '@material-ui/core/colors'
import { darken, fade } from '@material-ui/core/styles/colorManipulator'
import { theme } from './components/styles/Theme'

// Button
export const StyledButton = withStyles({
    root: {
        padding: '5px 30px',
        margin: '0 5px',
        marginTop: '10px',
        '&.MuiButton-text': {
            backgroundColor: '#fff',
            '&:hover': {
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            },
        },
        '&.MuiButton-contained': {
            backgroundColor: grey[200],
            color: grey[600],
            '&.Mui-disabled': {
                opacity: 0.5,
            },
        },
        '&.MuiButton-containedPrimary': {
            color: grey[50],
            background: `linear-gradient(to right bottom, ${theme.accentDark} 0%, ${theme.accentMedium} 80%)`,
            '&:hover': {
                filter: 'brightness(90%)',
            },
        },
        '&.MuiButton-containedSecondary': {
            color: grey[50],
            background: darken(green[400], 0.2),
            '&:hover': {
                filter: 'brightness(95%)',
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            },
        },
        '&.MuiButton-outlinedSecondary': {
            color: '#e80000',
            background: '#fae7e6',
            border: 'solid 1px #e80000',
            '&:hover': {
                background: '#fcc6c4',
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            },
        },
    },
})(Button)

// Fab
export const StyledFab = withStyles({
    root: {
        color: grey[50],
        background: teal[500],
        '&:hover': {
            background: teal[500],
            filter: 'brightness(90%)',
        },
        '&.MuiFab-colorInherit': {
            color: theme.accentDark,
            background: '#fff',
            '&:hover': {
                color: theme.accentDark,
                background: '#fff',
                filter: 'brightness(1.2)',
            },
        },
    },
    primary: {
        background: darken(green[300], 0.2),
        '&:hover': {
            background: darken(green[300], 0.2),
            filter: 'brightness(90%)',
        },
    },
    secondary: {
        background: darken(red[300], 0.2),
        '&:hover': {
            background: darken(red[300], 0.2),
            filter: 'brightness(90%)',
        },
    },
})(Fab)

// Input
export const StyledInput = withStyles({
    root: {
        '& label.Mui-focused': {
            color: theme.accentMedium,
        },
        '& .Mui-disabled': {
            backgroundColor: theme.lightgray,
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.accentMedium,
            },
            '&.Mui-error fieldset': {
                borderColor: theme.red,
            },
        },
        '& .MuiSelect-root': {
            background: '#fff',
        },
        '& .MuiSelect-root.Mui-disabled': {
            backgroundColor: theme.lightgray,
        },
    },
})(TextField)

// ToggleButton
export const StyledToggleButton = withStyles({
    root: {
        '&.Mui-selected': {
            color: '#fff',
            backgroundColor: theme.accentMedium,
            '&:hover': {
                backgroundColor: theme.accentMedium,
                filter: 'brightness(1.1)',
            },
        },
    },
})(ToggleButton)

// Checkbox
export const StyledCheckbox = withStyles({
    colorSecondary: {
        '&.Mui-checked': {
            color: theme.accentMedium,
        },
    },
})(Checkbox)

// TableRow placeholder
export const TableRowPlaceholder = withStyles({
    root: {
        background: `linear-gradient(90deg, ${grey[100]}, ${grey[300]}, ${grey[400]})`,
        backgroundSize: '400% 400%',
        opacity: '0.5',
        animation: 'gradientBG 2s linear infinite',
        '& .MuiTableCell-sizeSmall': {
            padding: '4px 24px 4px 16px',
        },
    },
})(TableRow)

// Card with shadow
export const StyledCard = withStyles({
    root: {
        borderRadius: 10,
        boxShadow: '0 3px 13px 0 rgba(0, 0, 0, 0.17)',
    },
})(Card)

// Tooltip
export const StyledTooltip = withStyles({
    tooltip: {
        color: grey[900],
        background: fade(grey[100], 0.8),
    },
})(Tooltip)

// Border lineer progress
export const BorderLinearProgress = withStyles({
    root: {
        height: 14,
        backgroundColor: fade(brown[500], 0.2),
        borderRadius: 20,
    },
    bar: {
        borderRadius: 20,
        backgroundColor: brown[500],
    },
})(LinearProgress)

// ListItem
export const StyledListItem = withStyles({
    root: {
        '&.Mui-selected': {
            background: darken(fade(theme.accentLight, 0.5), 0.3),
        },
        '&.Mui-selected:hover': {
            background: darken(fade(theme.accentLight, 0.5), 0.3),
        },
    },
})(ListItem)
