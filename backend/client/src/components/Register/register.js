import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'

import { FaUserCircle } from "react-icons/fa";



function RegisterForm() {
    let history = useHistory();
    const [userData, setUserData] = useState({
        fname: '',
        lname: "",
        email: "",
        password: "",

    })
    const [error, setError] = useState([])

    const [resMsg, setResMsg] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
    })


    const [image, setImage] = useState({
        preview: "",
        row: ""
    })

    const userDataHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const fileHandler = (e) => {
        if (e.target.files.length) {

            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                row: e.target.files[0]
            })
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', image.row, image.row.name);
        formData.append('fname', userData.fname);
        formData.append('lname', userData.lname);
        formData.append('email', userData.email);
        formData.append('password', userData.password);

        axios
            .post("users/register", formData)
            .then(async (result) => {
                if (result.data.errMsg) {
                    console.log("from BE", result.data);
                    await setError(result.data.errMsg)
                } else {
                    alert("Nice, You are Registered")
                    history.push('/login')
                }
            })
            .catch((err) => {
                setResMsg(err.data)
                console.log(err)
            });
    }

    console.log("State", error);
    console.log("Res Message", resMsg);



    return (
        <div className="App-header">
            <h2>Welcome to Registration Page</h2>
            <div className="col-lg-6 col-md-6 col-12 ">
                <form enctype="multipart/form-data" className="form-group" onSubmit={submitHandler}>
                    <label htmlFor="upload-button" className="mb-3 d-flex justify-content-center mt-5" >
                        {/* image preview */}
                        {image.preview ? (
                            <img
                                src={image.preview}
                                alt="profile-pic"
                                className="rounded-circle ml-3"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    boxShadow: "3px 3px 6px 2px #173F5F",
                                }}
                            />
                        ) : (
                                <span
                                    // style={{ float: "left" }}
                                    className="ml-3 mb-4 d-flex flex-direction-column align-items-start"
                                >
                                    <span className="text-white col-3">
                                        <FaUserCircle
                                            style={{ width: "150px", height: '150px', }}
                                        />
                                    </span>
                                    <br />
                                </span>
                            )}
                    </label>

                    <input
                        type="file"
                        name="file"
                        style={{ display: "none" }}
                        id="upload-button"
                        onChange={fileHandler}
                        required
                    />
                    <input onChange={userDataHandler} className="form-control mt-2 " placeholder="First Name" type="text" name="fname" required />
                    {error.map(p => p.param === "fname" ? (<label style={{ fontSize: "13px", border: "none", color: "red" }} htmlFor="fname">{p.msg}</label>)
                        : null)}

                    <input onChange={userDataHandler} className="form-control mt-2 " placeholder="Last Name" type="text" name="lname" required />
                    {error.map(p => p.param === "lname" ? (<label style={{ fontSize: "13px", border: "none", color: "red" }} htmlFor="fname">{p.msg}</label>)
                        : null)}
                    <input onChange={userDataHandler} className="form-control mt-2 " placeholder="Enter Your Email" type="email" name="email" id="email" required />
                    {error.map(p => p.param === "email" ? (<label style={{ fontSize: "13px", border: "none", color: "red" }} htmlFor="email">{p.msg}</label>)
                        : null)}
                    <input onChange={userDataHandler} className="form-control mt-2 " placeholder="Password" type="password" name="password" required />
                    {error.map(p => p.param === "password" ? (<label style={{ fontSize: "13px", border: "none", color: "red" }} htmlFor="password">{p.msg}</label>)
                        : null)}

                    <input onChange={userDataHandler} className="form-control mt-2 " placeholder="Confirm Password" type="password" name="confirmPassword" required />
                    {error.map(p => p.param === "confirmPassword" ? (<label style={{ fontSize: "13px", border: "none", color: "red" }} htmlFor="confirmPassword">{p.msg}</label>)
                        : null)}

                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-2" />
                </form>

                <h5>I already have an Account - <Link to="/login">Sign in</Link></h5>
            </div>
        </div>
    )
}

export default RegisterForm
