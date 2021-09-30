import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import NotFoundImg from '../../images/404.png'

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

const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.textCenter}>
            <h1 className={classes.ErrorText}>Error: 404 Page Not Found</h1>    
            <img src={NotFoundImg} alt="404 NotFound" className={classes.ErrorImage} />
        </div>
    )
}

export default NotFound
