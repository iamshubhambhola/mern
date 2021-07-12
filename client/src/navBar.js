import React, { Component } from 'react'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavBar extends Component {
    state={
        isOpen: false
    }

    toggle = () =>{// we can use toggle() only when we bind the state therefore we have made arrow function to use without bind
        this.setState({
            isOpen : !this.state.isOpen
        });
    }
    render() {
        return (
            <div style={{margin:"5rem"}}>
              <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} className="mr-2" />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="https://github.com/iamshubhambhola">GitHub</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
        );
    }
}

 