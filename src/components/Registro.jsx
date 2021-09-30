import React,{useState} from 'react'

import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import {Modal, Icon, IconButton, Grid, Container, Paper, Avatar, Typography, TextField, CssBaseline} from '@material-ui/core'
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

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HowToRegIcon from '@material-ui/icons/HowToReg';

//---------AlertDialogError begin-----------------
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//---------AlertDialogError end-------------------

import axios from 'axios';
 
const urlApi="http://localhost:3001/api/auth/singup";


const useStyles = makeStyles(theme=>({
    
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

const Registro = () => {

    const classes = useStyles()

    const [bodyUp, setBodyUp]= useState({username:'', email:'', password:''})
    const [roleName, setRoleName] = useState([]);
    
    const [open, setOpen]= useState(false);
    const [mensajeError, setMensajeError]= useState('');
    const[estadoError, setEstadoError]= useState(0);

    const handleChangeBodyUp=(event)=>{  
        setBodyUp({
          ...bodyUp,
          [event.target.name]:event.target.value
        })
      }
      
    const handleRoleChange = (e) => {
        const {value}= e.target;
          setRoleName(value);   
      };


    const names = [
        'admin',
        'invited',
        'user',   
      ];
      
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };
    
      
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
                "Content-Type":"application/json"
                },
                data:{
                username:bodyUp.username,
                email:bodyUp.email,
                password:bodyUp.password,
                roles: roleName
                }
             })
             .then(response=>{
              sessionStorage.setItem('accessToken', JSON.stringify(response.data.token));
              sessionStorage.setItem('roles', JSON.stringify(response.data.rolesName));
              window.location.assign("/navbar");  
              })
             .catch(error=>{
                   if(String(error)=="Error: Network Error")
                      window.location.assign("/servidor");
                   else{
                        setEstadoError(error.response.status)
                        setMensajeError(error.response.data.message)
                        OpenAlertDialog() 
                       }      
              })
           
    }

return (
    <div>
        <Grid container component="main" className={classes.secundaryContainer}>
        <CssBaseline/>
        <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
          <div className={classes.div}>
             <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
             </Avatar>
             <Typography component='h1' variant="h5">Sign Up</Typography>
             <form className={classes.formulario}  method="POST">
             <TextField
               fullWidth
               autoFocus
               color='primary'
               margin='normal'
               variant='outlined'
               label='usuario'
               name= 'username'
               value={bodyUp.username} 
               onChange={handleChangeBodyUp}             
             />  
             <TextField
               fullWidth
               autoFocus
               color='primary'
               margin='normal'
               variant='outlined'
               label='email'
               name= 'email'
               value={bodyUp.email} 
               onChange={handleChangeBodyUp}             
             />
             <TextField
               fullWidth
               type='password'
               color='primary'
               margin='normal'
               variant='outlined'
               label='password'
               name='password'
               value={bodyUp.password}
               onChange={handleChangeBodyUp}
             />
             <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Roles</InputLabel>
                  <Select
                     labelId="demo-mutiple-checkbox-label"
                     id="demo-mutiple-checkbox"
                     multiple
                     value={roleName}
                     onChange={handleRoleChange}
                     input={<Input />}
                     renderValue={(selected) => selected.join(',')}
                     MenuProps={MenuProps}
                  >
                     {names.map((name) => (
                     <MenuItem key={name} value={name}>
                     <Checkbox checked={roleName.indexOf(name) > -1}/>
                     <ListItemText primary={name} />
                     </MenuItem>
                     ))}
                  </Select>
             </FormControl>
             <Button 
             fullWidth
             variant="contained" 
             color="primary"
             className={classes.button}
             onClick={async()=>await peticionPost()}
             >  
             Sign Up            
             </Button>
             <Button
              variant="contained"
              color="secondary"
              className={classes.buttonLogin}
              startIcon={<HowToRegIcon/>}
              href="/"
             >
              Login
             </Button>
             </form>
          </div>
        </Container>
      </Grid>
      {MensajeError}
    </div>
    )
}

export default Registro
