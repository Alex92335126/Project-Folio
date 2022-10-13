import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useDispatch } from "react-redux";
import { signupThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [login, setLogin] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
    };

    const submit = async () => {
        console.log('clicked me', login)
        dispatch(signupThunk(login))
        .then(() => navigate("/portfolio"))
    }


    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column signup">
                <div>
                    <label>
                        Username:
                        <input
                            type="text" 
                            name="username"
                            value={login.username}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password" 
                            name="password"
                            value={login.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        First Name:
                        <input
                            type="text" 
                            name="firstName"
                            value={login.firstName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input
                            type="text" 
                            name="lastName"
                            value={login.lastName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="text" 
                            name="email"
                            value={login.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <Button variant="primary" onClick={submit}>
                    Submit
                </Button>
            </div>
        </>
    )
}