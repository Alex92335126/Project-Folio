import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState({
        username: "",
        password: ""
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
        dispatch(loginThunk(login))
        .then(() => navigate("/portfolio"))
    }

    
    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column login">
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
                <Button variant="primary" onClick={submit}>
                    Submit
                </Button>
            </div>
        </>
    )
}