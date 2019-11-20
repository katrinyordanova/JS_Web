import React from 'react';
import '../Shared/RegisterAndLogin/RegisterAndLogin.css';

function Register() {
    return (
        <div className="Register">
            <h1>Register</h1>
            <form>
                <div className="form-control">
                    <label>Email</label>
                    <input type="email"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password"/>
                </div>
                <div className="form-control">
                    <label>Confirm password</label>
                    <input type="password"/>
                </div>
                <div className="form-control">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;