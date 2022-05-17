import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Navigation = () => {

    const { logout } = useAuth();



    return (

        <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="myNavBar">
            <Container>
                <Navbar.Brand href="#home">Welcome</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" className="navLink" style={({ isActive }) => {
                            return {
                                color: isActive ? "red" : "white"
                            }
                        }}
                        >Home</NavLink>
                    </Nav>
                    <button className="navLink btn btn-primary logOut" onClick={logout}>Log Out</button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation