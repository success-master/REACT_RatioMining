import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}))

const PaginationActions = ({ count, page, rowsPerPage, onChangePage }) => {
    const classes = useStyles();

    const handleFirstPageButtonClick = event => onChangePage(event, 0)
    const handleBackButtonClick = event => onChangePage(event, page - 1)
    const handleNextButtonClick = event => onChangePage(event, page + 1)
    const handleLastPageButtonClick = event => onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))

    return (
        <div className={classes.root}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="ilk sayfa"
          >
            <FirstPage />
          </IconButton>
          <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="önceki sayfa">
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="sonraki sayfa"
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="son sayfa"
          >
            <LastPage />
          </IconButton>
        </div>
      )
}

PaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

export default PaginationActions
