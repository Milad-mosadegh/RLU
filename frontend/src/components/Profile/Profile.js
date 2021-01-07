import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Profile() {
    let history = useHistory();

    const [userData, setUserData] = useState({})
    const [resMsg, setResMsg] = useState()

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3001/users/all",
        }).then(response => {
            setUserData(response.data[0])
            console.log("Profile", response.data[0])
        }).catch(err => {
            console.log(err);
        }
        )
    }, [])
    return (
        <div className="App-header">
            <h1>Welcome <span className='text-danger'></span> to Profile Page</h1>
            <div className="container w-25">
                <form className="form-group" onSubmit={(e) => {
                    e.preventDefault();
                    axios({
                        method: "PUT",
                        url: "http://localhost:3001/users/update",
                        data: userData
                    }).then(response => {
                        alert("You have Successfully Updated")
                        history.push('/')
                        setUserData(response.data[0])
                        console.log(resMsg)

                    }).catch(err => {
                        setResMsg(err.data)
                    }
                    )
                }}>
                    <input value={userData.fname} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="First Name" type="text" name="fname" />
                    <input value={userData.lname} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="Last Name" type="text" name="lname" />
                    <input value={userData.email} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="Enter Your Email" type="email" name="email" disabled />
                    <input value={userData.password} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className="form-control mt-2 " placeholder="Password" type="password" name="password" />
                    <input type="submit" value="Update" className="btn btn-info btn-block mt-2" />
                </form>
            </div>
        </div>
    )
}

export default Profile
