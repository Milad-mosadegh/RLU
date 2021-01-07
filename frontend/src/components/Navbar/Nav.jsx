import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


function Navbars() {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Mongoose Profile</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link >
                        <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link >
                        <Link to="/login">Login</Link>
                    </Nav.Link>
                    <Nav.Link >
                        <Link to="/register">Register</Link>
                    </Nav.Link>
                    <Nav.Link >
                        <Link to="/profile">Profile</Link>
                    </Nav.Link>


                </Nav>

            </Navbar>
        </div>
    )
}

export default Navbars
