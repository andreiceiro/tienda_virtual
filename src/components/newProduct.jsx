import React,{forwardRef, useState, useEffect} from 'react'
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
    {
      title:'Categoria',
      field:'category',
      type:'string'
    },
    {
      title:'Precio',
      field:'price',
      type:'numeric'
    },
    {
      title:'Imagen',
      field:'imgURL'
    },
    {
      title:'Usuario',
      field:'user',
      type:'string'
    }
  ]

const urlApi="http://localhost:3001/api/products";

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

const accessToken=JSON.parse(sessionStorage.getItem('accessToken'));


axios.interceptors.request.use(
  config=>{
    config.headers.authorization= `Bearer ${accessToken}`;
    return config;
  },
  error =>{
    return Promise.reject(error);
  }
); 

const NewProduct = () => {

  const classes= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);//cuando es true se abre la ventana modal
   //y cuando es false se cierra la ventana modal
  const [modalEditar, setModalEditar]= useState(false);//analogo al modal anterior
  const [modalEliminar, setModalEliminar]= useState(false);//analogo al modal anterior
  const [productoSeleccionado, setProductoSeleccionado]= useState({
    _id:"",
    name: "",
    category: "",
    price: 0,
    imgURL: "",
    user: ""
        
  })

  const handleChange=e=>{
    const {name, value}= e.target;
    setProductoSeleccionado(prevState=>({
      ...prevState,
      [name]:value
    }));
  
    console.log(productoSeleccionado)
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
               console.log(accessToken)
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
               name: productoSeleccionado.name,
               category: productoSeleccionado.category,
               price: productoSeleccionado.price,
               imgURL: productoSeleccionado.imgURL
               }
             })
            .then(response=>{
             console.log(response.data);
             setData(data.concat(response.data));
             AbrirCerrarModalInsert();
             })
            .catch(error=>{ 
             AbrirCerrarModalInsert()
             window.location.assign("/servidor")
             }) 

 }

const peticionPut= async()=>{
  
         await axios({
               method: "put",
               url:urlApi+"/"+productoSeleccionado._id,
               headers:{
               "Content-Type":"application/json",
               "x-access-token": accessToken
               },
               data:{
               name: productoSeleccionado.name,
               category: productoSeleccionado.category,
               price: productoSeleccionado.price,
               imgURL: productoSeleccionado.imgURL
               }
            })
            .then(response=>{
             console.log(response.data);
             let dataAct=data;
             dataAct.map(producto=>{
                  if(producto._id===productoSeleccionado._id)
                    {
                    producto.name= productoSeleccionado.name;
                    producto.category= productoSeleccionado.category;
                    producto.price= productoSeleccionado.price;
                    producto.imgURL= productoSeleccionado.imgURL;
                    producto.user= productoSeleccionado.user;
                    }
                });
            setData(dataAct);
            AbrirCerrarModalEditar();
             })
            .catch(error=>{
             AbrirCerrarModalEditar()
             window.location.assign("/servidor")
            })

  }

const peticionDelete= async()=>{
    
         await axios({
               method: "delete",
               url:urlApi+"/"+productoSeleccionado._id,
               headers:{
               "Content-Type":"application/json",
               "x-access-token": accessToken
               },
            })
            .then(response=>{
             console.log(response.data);
        
             setData(data.filter(producto=>producto._id!==productoSeleccionado._id));
             AbrirCerrarModalEliminar();
            })
            .catch(error=>{
             AbrirCerrarModalEliminar()
             window.location.assign("/servidor")
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

  const selectedProduct=(producto, operacion)=>{
    setProductoSeleccionado(producto);
    (operacion==='Editar')?AbrirCerrarModalEditar():AbrirCerrarModalEliminar()
    console.log(producto);
  }

  useEffect(()=>{
    peticionGet();
  },[])

  //---------------------------------------------
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

  //---------------------------------------------

  const bodyInsertar=(
    <div className={classes.modal}>
       <h3>Agregar Nuevo Producto</h3>
       <TextField
         className={classes.inputMaterial}
         label="Nombre"
         name="name" 
         onChange={handleChange} 
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Categoria"
         name="category"
         onChange={handleChange}
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Precio"
         name="price"
         onChange={handleChange}   
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Imagen"
         name="imgURL"
         onChange={handleChange}   
       />
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
       <h3>Editar Producto</h3>
       <TextField
         className={classes.inputMaterial}
         label="Producto"
         name="name" 
         onChange={handleChange} 
         value={productoSeleccionado&&productoSeleccionado.name}
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Categoria"
         name="category"
         onChange={handleChange}
         value={productoSeleccionado&&productoSeleccionado.category}
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Precio"
         name="price"
         onChange={handleChange} 
         value={productoSeleccionado&&productoSeleccionado.price}  
       />
       <br/>
       <TextField
         className={classes.inputMaterial}
         label="Imagen"
         name="imgURL"
         onChange={handleChange} 
         value={productoSeleccionado&&productoSeleccionado.imgURL}  
       />
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
       <p>Está seguro que deseas eliminar al producto <b>
         {productoSeleccionado && productoSeleccionado.name}</b>?</p>
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
             Insertar Producto
            </Button>
            <br/><br/>
            <MaterialTable
             columns={columnas}
             data={data}
             title="Productos"
             icons={tableIcons}
             actions={[
                {
                icon:tableIcons.Edit,
                tooltip:'Editar Producto',
                onClick:(event, rowData)=>selectedProduct(rowData,"Editar")
                },
                {
                icon:tableIcons.Delete,
                tooltip:'Eliminar Producto',
                onClick:(event, rowData)=>selectedProduct(rowData,"Eliminar")
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

export default NewProduct
