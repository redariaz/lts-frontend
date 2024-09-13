import React, { useState } from 'react'
import './styles/custom-styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import appLabels from './Labels';
import { Link } from 'react-router-dom';

function AuthForm({ isLogin }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  return (
    <div className='outerContainer'>
      <div className="loginContainer">
        <form>
          <h2 style={{ fontWeight: "bold" }}>{isLogin ? "Login" : "Sign up!"}</h2>
          <div className="innerContainer">
            <div className="emailContainer">
              <label>{appLabels.signup.labels.email}</label>
              <input
                id='email'
                name='email'
                type='email'
                className='form-control form-control-sm'
                placeholder='Enter email'
              />
            </div>
            <div className="passwordContainer">
              <label>{appLabels.signup.labels.password}</label>
              <input
                id='password'
                name='password'
                type='password'
                className='form-control form-control-sm'
                placeholder='Enter password'
              />
            </div>
						{isLogin && (
							<div className='form-check'>
								<input
									type='checkbox'
									className='form-check-input'
									id='rememberme'
									name='rememberme'
								/>
								<small>&nbsp;Remember me</small>
							</div>
						)}
          </div>
          <Button>{appLabels.signup.button[isLogin ? "login" : "signup"]}</Button><br/>
					<small>
						{isLogin ? "Don't have an account? " : "Already a user? "}
						<Link to={isLogin ? "/signup" : "/login"}>{isLogin ? "Sign up" : "Login"}</Link>
					</small>
        </form>
      </div>
    </div>
  )
}

export default AuthForm;