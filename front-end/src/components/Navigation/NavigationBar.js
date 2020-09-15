import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = props => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        {props.auth.isAuthenticated() ? (
          <>
            <Nav>
              <NavDropdown
                title="Consultorio"
                id="ddlConsultingRoom"
              ></NavDropdown>
              <NavDropdown title="Pilates" id="ddPilates">
                <NavDropdown.Item href="/Pilates/Clases">
                  Clases
                </NavDropdown.Item>
                <NavDropdown.Item href="/Pilates/Horarios">
                  Horarios
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Pilates/HorasProfesores">
                  Horas Profesores
                </NavDropdown.Item>
                <NavDropdown.Item href="/Pilates/PagoProfesores">
                  Pago Profesores
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Pilates/Alumnos">
                  Alumnos
                </NavDropdown.Item>
                <NavDropdown.Item href="/Pilates/Cuotas">
                  Cuotas
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Pilates/Configuracion">
                  Configuración
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="General" id="ddlGeneral">
                <NavDropdown.Item href="/General/Movimientos">
                  Movimientos
                </NavDropdown.Item>
                <NavDropdown.Item href="/General/Profesionales">
                  Profesionales
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/Profile">Mi Perfil</Nav.Link>
              <Nav.Link href="/Login">Salir</Nav.Link>
            </Nav>
          </>
        ) : (
          <>
            <Nav className="ml-auto">
              <Nav.Link href="/Login">Ingresar</Nav.Link>
            </Nav>
          </>
        )}
      </Navbar>
    </>
  );
};

export default NavigationBar;
