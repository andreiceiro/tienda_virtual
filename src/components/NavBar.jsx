import React from 'react'
import { makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import GroupIcon from '@material-ui/icons/Group';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NewProduct from './newProduct';


import Login from '../components/Login'

  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const DeleteKeyAccess=()=>{
    if(sessionStorage.getItem('accessToken')==null && sessionStorage.getItem('roles')==null)
       return

    if(sessionStorage.getItem('accessToken'))
       sessionStorage.removeItem('accessToken') 
    
    if(sessionStorage.getItem('roles'))
       sessionStorage.removeItem('roles')
}

const EnableONOFF=()=>{
  if(sessionStorage.getItem('roles')==null)
    {
      window.location.assign("/servidor")
      return
    }
    
  const rolesUser=JSON.parse(sessionStorage.getItem('roles'));
  if(rolesUser.length==1 && rolesUser[0]=='admin')
     return false
  
  if(rolesUser.length==1 && (rolesUser[0]=='user'||rolesUser[0]=='invited'))
     return true
  

  if(rolesUser.length==2)
     {
       if (rolesUser[0]!='admin' && rolesUser[1]!='admin') 
           return true
       
       if (rolesUser[0]=='admin' && rolesUser[1]!='admin') 
           return false
       
       if (rolesUser[0]!='admin' && rolesUser[1]=='admin') 
           return false    
     }
  
  if(rolesUser.length==3)
     return false
}

const NavBar = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static">
               <Toolbar>
                  <IconButton edge="start" 
                  className={classes.menuButton} 
                  color="inherit" 
                  aria-label="menu"  
                  disabled={EnableONOFF()}
                  onClick={()=>window.location.assign("/user")}                                                                                               
                  >
                     <GroupIcon/>
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                   Usuarios
                  </Typography>
                  <IconButton edge="start" 
                  className={classes.menuButton} 
                  color="inherit" 
                  aria-label="menu" 
                  onClick={()=>window.location.assign("/product")}
                  >
                      <ShoppingCartIcon/>
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                   Productos
                  </Typography>
                  <Button color="inherit"
                  onClick={()=> {DeleteKeyAccess();
                     window.location.assign("/");  
                     }
                  }
                  >Logout</Button>
               </Toolbar>
            </AppBar>

        </div>
    )
}

export default NavBar
