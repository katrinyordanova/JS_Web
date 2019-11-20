import React from 'react';
import '../Shared/RegisterAndLogin/RegisterAndLogin.css';

function Login() {
    return (
        <div className="Login">
            <h1>Login</h1>
            <div className="form-control">
                <label>Email</label>
                <input type="text"/>
            </div>
            <div className="form-control">
                <label>Password</label>
                <input type="password"/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </div>
    )
}

export default Login;