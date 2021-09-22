import React,{forwardRef} from 'react'
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
import {Modal, TextField, Button, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import image from '../images/fondo.jpg'
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
     title:'Nombre',
     field:'name'
    },
  ]

  const data=[
    {name:'admin'},
    {name:'invitado'},
    {name:'children'},
    {name:'user'},
    {name:'user'}
  ]

  const urlApi="http://localhost:3001/api/roles";

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

const NewRole = () => {
    
    return (
        <div>
           <MaterialTable
             columns={columnas}
             data={data}
             title="Roles"
             icons={tableIcons}
             actions={[
                 {
                 icon:tableIcons.Edit,
                 tooltip:'Editar Rol',
                 onClick:(event, rowData)=>alert('Seguro quieres editar el rol:'+rowData.name)
                 },
                 {
                 icon:tableIcons.Delete,
                 tooltip:'Eliminar Rol',
                 onClick:(event, rowData)=>window.confirm('Seguro quieres eliminar el rol:'+rowData.name+'?')
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
        </div>
    )
}

export default NewRole
