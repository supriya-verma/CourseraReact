import React, {Component} from 'react';
import {Navbar, NavbarBrand, Jumbotron} from 'reactstrap';

class Header extends Component{
     render(){
         return(
            <>
        <Navbar dark>
         <div className="container">
          <NavbarBrand href="/">
          Supriya
          </NavbarBrand>
         </div>
        </Navbar>
        <Jumbotron>
        <div className="container">
           <div className="row row-header">
            <div className="col-12 col-sm-6">
            <h1> Supriya Verma</h1>
            <p>We take inpiration from the World's best cuisines, and create a unique future expansion. </p>
            </div>
           </div>
        </div>
        </Jumbotron>
            </>
         );
     }
}

export default Header;