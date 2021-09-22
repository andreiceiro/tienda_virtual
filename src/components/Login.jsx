import React,{useState, useEffect} from "react";
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import {Icon, IconButton, Grid, Container, Paper, Avatar, Typography, TextField, CssBaseline} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import fondo from '../images/fondo.jpg'
import { Label, LabelImportant, LockOutlined as LockOutlinedIcon, ViewArrayTwoTone } from "@material-ui/icons";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import HowToRegIcon from '@material-ui/icons/HowToReg';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

//---------AlertDialogError begin-----------------
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//---------AlertDialogError end-------------------

import axios from 'axios';
 
const urlApi="http://localhost:3001/api/auth/singin";



const useStyles = makeStyles(theme=>({
    mainContainer:{
          backgroundImage: `url(${fondo})`,
          backgraundRepeat:'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh'
  
    },
    secundaryContainer:{
      backgroundImage: `url(${fondo})`,
      backgraundRepeat:'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '130vh'

    },
    container:{
      opacity: '0.6',
      height: '75%',
      marginTop: theme.spacing(10),
      [theme.breakpoints.down(400+ theme.spacing(2)+2)]:{
        marginTop: 0,
        width:'100%',
        height:'100%'
      }
    },
    div:{
       marginTop: theme.spacing(8),
       display: 'flex',
       flexDirection: 'column',
       alignItems:'center'
    },
    avatar:{
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },
    formulario:{
      width:'100%',
      marginTop: theme.spacing(1)
    },
    button:{
      margin: theme.spacing(3,0,2)
    },
    buttonLogin: {
      marginTop: theme.spacing(1),
      left: theme.spacing(37)
    },
    buttonRegistre: {
      marginTop: theme.spacing(1),
      left: theme.spacing(33)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    formControlLabel:{
       marginLeft: theme.spacing(8)
    },
    title: {
      flexGrow: 1,
    }
  }))

const Login = () => {
    
    const classes = useStyles()
    
    const [body, setBody] = useState({email:'', password:''})

    const [open, setOpen]= useState(false);
    const [mensajeError, setMensajeError]= useState('');
    const [estadoError, setEstadoError]= useState(0);

    const handleChangeBody=(event)=>{
      
      setBody({
        ...body,
        [event.target.name]:event.target.value
      })
    }

    const CloseAlertDialog = () => {
      setOpen(false);
    };
  
    const OpenAlertDialog = () => {
      setOpen(true);
    };


    const MensajeError=
          <Dialog
          open={open}
          onClose={CloseAlertDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Error "+estadoError}</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             {mensajeError}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={CloseAlertDialog} color="primary">
             Cerrar
            </Button>
          </DialogActions>
      </Dialog>

    const peticionPost=async()=>{
      await axios({
         method: "post",
         url:urlApi,
         headers:{
         "Content-Type":"application/json",
         },
         data:{
               email:body.email,
               password:body.password
         }
         
         
 
     })
     .then(response=>{
        
     sessionStorage.setItem('accessToken', JSON.stringify(response.data.token))
     sessionStorage.setItem('roles', JSON.stringify(response.data.rolesNameUserFound));
     console.log(JSON.stringify(response.data.token))
      /* localStorage.setItem('accessToken', JSON.stringify(response.data.token)); 
      localStorage.setItem('roles', JSON.stringify(response.data.rolesNameUserFound));   */
     })
     .catch(error=>{
       console.log(error.response);
       setEstadoError(error.response.status)
       setMensajeError(error.response.data.message)
       OpenAlertDialog()
       console.log(estadoError)
     })    
   }  


return (
    <div>
        <Grid container component="main" className={classes.mainContainer}>
        <CssBaseline/>
        <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
          <div className={classes.div}>
             <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
             </Avatar>
             <Typography component='h1' variant="h5">Sign In</Typography>
             <form className={classes.formulario} /* action={()=>peticionPost} */ method="POST">
             <TextField
               fullWidth
               autoFocus
               color='primary'
               margin='normal'
               variant='outlined'
               label='email'
               name= 'email'
               value={body.email} 
               onChange={handleChangeBody}             
             />
             <TextField
               fullWidth
               type='password'
               color='primary'
               margin='normal'
               variant='outlined'
               label='password'
               name='password'
               value={body.password}
               onChange={handleChangeBody}
             />
             <Button 
             fullWidth
             variant="contained" 
             color="primary"
             className={classes.button}
             onClick={
                      async()=>{
                                await peticionPost();
                                window.location.assign("/navbar");
                               }
                     }
             >  
             Sign In            
             </Button>
             <Button
              variant="contained"
              color="secondary"
              className={classes.buttonRegistre}
              startIcon={<PersonAddIcon/>}
              href="/singUp"
             >
              Register
             </Button>
             </form>
          </div>
        </Container>
      </Grid> 
      {MensajeError}
    </div>
    )
}

export default Login









