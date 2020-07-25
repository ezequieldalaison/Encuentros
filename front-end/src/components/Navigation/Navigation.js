import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = (props) => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
        {props.auth.isAuthenticated() ? 
            (<>
            <Nav> 
                <NavDropdown title="Pilates" id="ddPilates">
                    <NavDropdown.Item href="#action/3.1">Test</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/PilatesConfiguration">Configuración</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/Area">Áreas</Nav.Link>
            </Nav>
            <Nav className="ml-auto"> 
                <Nav.Link href="/Profile">Mi Perfil</Nav.Link>
                <Nav.Link href="/Login">Salir</Nav.Link>
            </Nav>
            </>) : 
            (<>
            <Nav className="ml-auto"> 
                <Nav.Link href="/Login">Ingresar</Nav.Link>
            </Nav>
            </>) 
                }
        </Navbar>
        </>
    );
}

export default Navigation;