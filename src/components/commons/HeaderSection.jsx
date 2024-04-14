import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";

function HeaderSection() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hogar Pro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Cliente">
              <NavDropdown.Item as={Link} to="/servicios/disponibles">
                Contratar Servicios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/servicios/contratados">
                Servicios Contratados
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Trabajador">
              <NavDropdown.Item as={Link} to="/servicios/ofrecer">
                Ofrecer Servicios
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Servicios Prestados
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Métodos de Pago">
              <NavDropdown.Item href="#action/3.1">
                Ingresa método de pago
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Métodos Registrados
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Edita tu perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderSection;
