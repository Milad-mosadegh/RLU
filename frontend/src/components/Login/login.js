import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'

function LoginForm() {
    let history = useHistory();
    const [userData, setUserData] = useState({})
    const [resMsg, setResMsg] = useState()
    const [loginInfo, setLoginInfo] = useState({})

    return (
        <div className="App-header">
            <h1>Welcome to Login Page </h1>
            <div className="container w-25">
                <form className="form-group"
                    onSubmit={(e) => {
                        e.preventDefault();
                        axios({
                            method: "POST",
                            url: "http://localhost:3001/users/login",
                            data: userData
                        }).then(response => {
                            setLoginInfo(response.data.login)
                            response.data.login ? alert(`Login Successfully ${response.data.result.email}`) : alert("Login was not success, Please try again")
                            history.push('/profile')
                            setResMsg(response.data)
                            console.log(response.data.login)
                        }).catch(err => {
                            setResMsg(err.data)
                        }
                        )
                    }}      >
                    <input onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control " placeholder="Enter Your Email" type="email" name="email" required />
                    <input onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2" type="password" name="password" required />
                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-2" />
                </form>
                <h5>I already don't have an Account! - <Link to="/register">Signup</Link></h5>

            </div>
        </div>
    )
}

export default LoginForm



