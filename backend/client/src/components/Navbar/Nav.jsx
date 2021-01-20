import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'



function Navbars() {
    const [state, setState] = useState()

    useEffect(() => {
        if (sessionStorage.getItem('uname')) {
            setState(sessionStorage.getItem('uname'))
        }
    }, [])


    return (
        <div>
            <Navbar bg="dark" variant="dark">

                <Navbar.Brand href="#home">Mongoose Profile</Navbar.Brand>
                <div className="d-flex col-md-6 col-6">
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
                        {sessionStorage.getItem("uname") ?
                            <Nav.Link >
                                <Link to="/profile">Profile</Link>
                            </Nav.Link>
                            :
                            null
                        }
                    </Nav>
                </div>
                {sessionStorage.getItem("uname") ?
                    <Nav.Item className="float-right text-light " >
                        Welcome {state}
                    </Nav.Item>
                    :
                    null}

            </Navbar>
        </div>
    )
}

export default Navbars
