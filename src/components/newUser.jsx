import React, {forwardRef, useState, useEffect} from 'react'
import MaterialTable from 'material-table'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from './NavBar';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const columnas=[
    {
     title:'Nombre de Usuario',
     field:'username'
    },
    {
      title:'Correo',
      field:'email'
    },
    {
      title:'Contraseña',
      field:'password'
    },
    {
      title:'Roles',
      field:'roles'
    },
  ];

const urlApi="http://localhost:3001/api/users";

const accessToken=JSON.parse(sessionStorage.getItem('accessToken'));

const useStyles= makeStyles((theme)=>({
  modal:{
        position:'absolute',
        width:400,
        backgroundColor: theme.palette.background.paper,
        border:'2px solid #000',
        padding: theme.spacing(2, 4, 3),
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
  },
  iconos:{
        cursor:'pointer'
  },
  inputMaterial:{
        width:'100%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  }
}));

const NewUser=()=> {
  const classes= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);//cuando es true se abre la ventana modal
   //y cuando es false se cierra la ventana modal
  const [modalEditar, setModalEditar]= useState(false);//analogo al modal anterior
  const [modalEliminar, setModalEliminar]= useState(false);//analogo al modal anterior
  const [roleName, setRoleName] = useState([]); 
  const [usuarioSeleccionado, setUsuarioSeleccionado]= useState({
    email:"",
    password:"",
    username:"",
    _id: ""
  })

  const handleChange=e=>{
    const {name, value}= e.target;
    setUsuarioSeleccionado(prevState=>({
      ...prevState,
      [name]:value
    }));
  
    console.log(usuarioSeleccionado)
  }

const peticionGet= async()=>{

         await axios({
               method: "get",
               baseURL: urlApi,
               headers:{
               "Content-Type":"application/json",
               "x-access-token": accessToken
               }
             })
             .then(response=>{
                  setData(response.data);
              })
             .catch(error=>{
                   window.location.assign("/servidor") 
              })

}

const peticionPost=async()=>{

          await axios({
                method: "post",
                url:urlApi,
                headers:{
                "Content-Type":"application/json",
                "x-access-token": accessToken
                },
                data:{
                     username: usuarioSeleccionado.username,
                     email: usuarioSeleccionado.email,
                     password: usuarioSeleccionado.password,
                     roles: roleName
                     }
             })
             .then(response=>{
                   console.log(response.data);
                   setData(data.concat(response.data[response.data.length-1]));
                   AbrirCerrarModalInsert();
                  })
             .catch(error=>{
                    AbrirCerrarModalInsert();
                    window.location.assign("/servidor");
                  })

}

const peticionPut= async()=>{
     
          await axios({
                method: "put",
                url:urlApi+"/"+usuarioSeleccionado._id,
                headers:{
                "Content-Type":"application/json",
                "x-access-token": accessToken
                },
                data:{
                      username: usuarioSeleccionado.username,
                      email: usuarioSeleccionado.email,
                      password: usuarioSeleccionado.password,
                      roles: roleName
                     }
               })
               .then(response=>{
                     console.log(response.data);
                     let dataAct=data;
                     dataAct.map(usuario=>{
                                          if(usuario._id===usuarioSeleccionado._id)
                                            {
                                            usuario.username=usuarioSeleccionado.username;
                                            usuario.email=usuarioSeleccionado.email;
                                            usuario.password=usuarioSeleccionado.password;
                                            usuario.roles=roleName;
                                            }
                                 });
                     setData(dataAct);
                     AbrirCerrarModalEditar();
                   })
                .catch(error=>{
                      AbrirCerrarModalEditar();
                      window.location.assign("/servidor");
                     })
     
}

const peticionDelete= async()=>{
    
          await axios({
                method: "delete",
                url:urlApi+"/"+usuarioSeleccionado._id,
                headers:{
                "Content-Type":"application/json",
                "x-access-token": accessToken
                },
             })
             .then(response=>{
                   console.log(response.data);
        
              setData(data.filter(usuario=>usuario._id!==usuarioSeleccionado._id));
              AbrirCerrarModalEliminar();
              })
             .catch(error=>{
                    AbrirCerrarModalEliminar();
                    window.location.assign("/servidor");
                  })

}


  const AbrirCerrarModalInsert=()=>{
    setModalInsertar(!modalInsertar);
  }

  const AbrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const AbrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const selectedUser=(usuario, operacion)=>{
    setUsuarioSeleccionado(usuario);
    setRoleName(usuario.roles);
    (operacion==='Editar')?AbrirCerrarModalEditar():AbrirCerrarModalEliminar()
    console.log(usuario);
  }

  useEffect(()=>{
    peticionGet();    
  },[])

  //---------------------------------------------
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


  const handleRoleChange = (e) => {
    const {value}= e.target;
    
      setRoleName(value);
    
  };

  //---------------------------------------------

  const bodyInsertar=(
    <div className={classes.modal}>
       <h3>Agregar Nuevo Usuario</h3>
       <TextField
         className={classes.inputMaterial}
         label="Usuario"
         name="username" 
         onChange={handleChange} 
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Correo"
         name="email"
         onChange={handleChange}
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Contraseña"
         name="password"
         onChange={handleChange}   
       />
       <br/>
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
          name="roles"
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={roleName.indexOf(name) > -1}/>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
       <br/>
       <br/>
       <div align="right">
         <Button variant="text" 
          color="primary" 
          onClick={async()=>await peticionPost()}
         >
           Insertar
         </Button>
         <Button variant="text" color="default" onClick={()=>AbrirCerrarModalInsert()}>
           Cancelar
         </Button>
       </div>
    </div>
  )

  const bodyEditar=(
    <div className={classes.modal}>
       <h3>Editar Usuario</h3>
       <TextField
         className={classes.inputMaterial}
         label="Usuario"
         name="username" 
         onChange={handleChange} 
         value={usuarioSeleccionado&&usuarioSeleccionado.username}
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Correo"
         name="email"
         onChange={handleChange}
         value={usuarioSeleccionado&&usuarioSeleccionado.email}
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Contraseña"
         name="password"
         onChange={handleChange} 
         value={usuarioSeleccionado&&usuarioSeleccionado.password}  
       />
       <br/>
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
          name="roles"
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={roleName.indexOf(name) > -1}/>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
       <br/>
       <br/>
       <div align="right">
         <Button variant="text" 
          color="primary" 
          onClick={async()=>await peticionPut()}
         >
           Editar
         </Button>
         <Button variant="text" color="default" onClick={()=>AbrirCerrarModalEditar()}>
           Cancelar
         </Button>
       </div>
    </div>
  )

  const bodyEliminar=(
    <div className={classes.modal}>
       <p>Está seguro que deseas eliminar al usuario <b>
         {usuarioSeleccionado && usuarioSeleccionado.username}</b>?</p>
       <div align="right">
         <Button variant="text" 
          color="secondary" 
          onClick={async()=>await peticionDelete()}
         >
           Si
         </Button>
         <Button variant="text" color="default" onClick={()=>AbrirCerrarModalEliminar()}>
           No
         </Button>
       </div>
    </div>
  )

  return (
    <div>
      <NavBar/>
      <br/>
      <Button variant="text" color="default" onClick={()=>AbrirCerrarModalInsert()}>
        Insertar Usuario
      </Button>
      <br/><br/>
      <MaterialTable
        columns={columnas}
        data={data}
        title="Usuarios"
        icons={tableIcons}
        actions={[
          {
            icon:tableIcons.Edit,
            tooltip:'Editar Usuario',
            onClick:(event, rowData)=>selectedUser(rowData,"Editar")
          },
          {
            icon:tableIcons.Delete,
            tooltip:'Eliminar Usuario',
            onClick:(event, rowData)=>selectedUser(rowData,"Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex:-1
        }}
        localization={{
          header:{
            actions:'Acciones'
          }
        }}
      />


      <Modal
      open={modalInsertar}
      onClose={AbrirCerrarModalInsert}>
        {bodyInsertar}
      </Modal>

      <Modal
      open={modalEditar}
      onClose={AbrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal
      open={modalEliminar}
      onClose={AbrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  )
}

export default NewUser






