import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from '../components/Login'
import Registro from "./Registro";
import newProduct from "./newProduct"
import newUser from "./newUser"
import NavBar from "./NavBar";


function App() {
  return (
    <BrowserRouter>
      <Switch>
         <Route exact path="/" component={Login}/>
         <Route exact path="/singUp" component={Registro}/>
         <Route exact path="/product" component={newProduct}/>
         <Route exact path="/user" component={newUser}/>
         <Route exact path="/navbar" component={NavBar}/>
      </Switch>    
    </BrowserRouter>
  )
}

export default App;
