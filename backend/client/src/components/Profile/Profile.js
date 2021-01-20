import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";



function Profile() {
    let history = useHistory();

    const [userData, setUserData] = useState({})
    const [resMsg, setResMsg] = useState()

    const [image, setImage] = useState({
        preview: "",
        row: ""
    })

    const fileHandler = (e) => {
        setUserData({ ...userData, profileImg: "" })
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                row: e.target.files[0]
            })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', image.row, image.row.name);
        formData.append('fname', userData.fname);
        formData.append('lname', userData.lname);
        formData.append('email', userData.email);
        formData.append('password', userData.password);

        axios({
            method: "PUT",
            url: "/users/update",
            data: formData
        }).then(response => {
            alert("You have Successfully Updated")
            history.push('/')
            setUserData(response.data[0])
        }).catch(err => {
            setResMsg(err.data)
        }
        )
    }


    useEffect(() => {
        axios({
            method: "GET",
            url: "/users/all",
        }).then(response => {
            if (response) {
                setUserData(response.data[0])
            } else {
                setUserData({})
            }
        }).catch(err => {
            console.log(err);
        }
        )
        console.log("UserDAta", userData);
    }, [])

    const userDataHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    return (
        <div className="App-header">
            <h1>Welcome <span className='text-danger'></span> to Profile Page</h1>
            <div className="col-lg-6 col-md-6 col-12">
                <form className="form-group" encType="multipart/form-data" onSubmit={submitHandler}>
                    <label htmlFor="upload-button" className="mt-5 mb-5 d-flex justify-content-center">
                        {userData.profileImg ? (
                            <img
                                src={userData.profileImg}
                                alt="profile-pic"
                                className="rounded-circle ml-3"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    boxShadow: "3px 3px 6px 2px #173F5F",
                                }}
                            />
                        ) : (
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
                            )}
                    </label>
                    <input
                        type="file"
                        name="userImg"
                        style={{ display: "none" }}
                        id="upload-button"
                        onChange={fileHandler}
                    />

                    <input value={userData.fname} onChange={userDataHandler} className="form-control mt-2 " placeholder="First Name" type="text" name="fname" />
                    <input value={userData.lname} onChange={userDataHandler} className="form-control mt-2 " placeholder="Last Name" type="text" name="lname" />
                    <input value={userData.email} onChange={userDataHandler} className="form-control mt-2 " placeholder="Enter Your Email" type="email" name="email" disabled />
                    <input value={userData.password} onChange={userDataHandler} className="form-control mt-2 " placeholder="Password" type="password" name="password" />
                    <input type="submit" value="Update" className="btn btn-info btn-block mt-2" />
                    <input type="button" value="Logout" className="btn btn-danger btn-block mt-2" onClick={() => {
                        sessionStorage.removeItem("uname")
                        alert("Are you sure to want to Logout?!")
                        history.push('/')
                        window.location.reload()
                    }} />
                </form>
            </div>
        </div>
    )
}

export default Profile
