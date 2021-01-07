import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Success from '../Alert/Success';

function RegisterForm() {
    let history = useHistory();
    const [userData, setUserData] = useState({})
    const [resMsg, setResMsg] = useState()
    return (
        <div className="App-header">
            <h1>Welcome to Registration Page</h1>
            <div className="container w-25">
                <form className="form-group" onSubmit={(e) => {
                    e.preventDefault();
                    axios({
                        method: "POST",
                        url: "http://localhost:3001/users/register",
                        data: userData
                    }).then(response => {
                        // alert("You are registered")
                        if (response.data.message === false) {
                            alert("This email is already token")
                        } else {
                            alert("Nice, You are Registered")
                            setResMsg(response.data.result)
                            console.log("Come from axios", resMsg)
                            history.push('/login')
                        }
                    }).catch(err => {
                        setResMsg(err.data)
                    }
                    )
                }}>
                    <input onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="First Name" type="text" name="fname" required />
                    <input onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="Last Name" type="text" name="lname" required />
                    <input onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="Enter Your Email" type="email" name="email" required />
                    <input onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="Password" type="password" name="password" required />
                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-2" />
                </form>

                <h5>I already have an Account - <Link to="/login">Sign in</Link></h5>
            </div>
        </div>
    )
}

export default RegisterForm
