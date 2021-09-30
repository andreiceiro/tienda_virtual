import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from '../components/Login'
import Registro from "./Registro";
import newProduct from "./newProduct"
import newUser from "./newUser"
import NavBar from "./NavBar";
import NotFound from "./errors/NotFound";
import InternalServerError from "./errors/InternalServerError";


function App() {
  return (
    <BrowserRouter>
      <Switch>
         <Route exact path="/" component={Login}/>
         <Route exact path="/singUp" component={Registro}/>
         <Route exact path="/product" component={newProduct}/>
         <Route exact path="/user" component={newUser}/>
         <Route exact path="/navbar" component={NavBar}/>
         <Route exact path="/servidor" component={InternalServerError}/>
         <Route component={NotFound}/>
      </Switch>    
    </BrowserRouter>
  )
}

export default App;
