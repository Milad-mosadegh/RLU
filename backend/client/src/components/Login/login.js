import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'

function LoginForm() {
    let history = useHistory();
    const [userData, setUserData] = useState({})
    const [resMsg, setResMsg] = useState()
    const [loginInfo, setLoginInfo] = useState({})
    // setTimeout(() => {
    //     localStorage.getItem("uname", "")
    //     alert("You are loged out")
    // }, 3000)

    return (
        <div className="App-header">
            <h1>Welcome to Login Page </h1>
            <div className="col-lg-6 col-md-6 col-12">
                <form className="form-group"
                    onSubmit={(e) => {
                        e.preventDefault();

                        axios({
                            method: "POST",
                            url: "/users/login",
                            data: userData
                        }).then(response => {

                            if (response.data.login === true) {
                                sessionStorage.setItem("uname", userData.email)
                                setLoginInfo(response.data.login)
                                alert(`Login Successfully`)
                                window.location.reload()
                                setResMsg(response.data)

                            } else {
                                sessionStorage.removeItem("uname", "")
                                alert("Login was not success, Please try again")
                                history.push('/login')
                            }
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



