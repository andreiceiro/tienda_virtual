import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InternalErrorImg from '../../images/500.png'

const useStyles= makeStyles(theme=>({
    ErrorImage: {
        height: theme.spacing(25),       //200 px
        marginTop: theme.spacing(7.5)    //60 px,
    },
    ErrorText: {
        marginTop: theme.spacing(5),   //40px
        fontFamily:["Arial", "Helvetica", "sans-serif"]     
    },
    textCenter:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    }

}))

const InternalServerError = () => {
    const classes= useStyles();
    return (
        <div className={classes.textCenter}>
            <h1 className={classes.ErrorText}>Error: 500 Unexpected Error</h1>    
            <img src={InternalErrorImg} alt="500 Unexpected Error" className={classes.ErrorImage} />
        </div>
    )
}

export default InternalServerError
