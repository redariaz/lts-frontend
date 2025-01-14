import React, { useState } from 'react'
import './styles/custom-styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from 'react-bootstrap';
import appLabels from './Labels';
import { Link } from 'react-router-dom';
import NotifyUser from './NotifyUser';

function AuthForm({ isLogin }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError({ ...error, email: false });
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: false });
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmitForm = () => {
    if (validateForm) {
      console.log("handleSubmit", 41);
      NotifyUser(appLabels.toastMessage.labels.success, "Login successful");
    } else {
      console.log("errorMsg", 48)
    }
  }

  const validateForm = (status) => {
    let isValid = true;
    let hasError = false;
    let errorMsg = "";
    if (status === "reset") {
      setErrorFields({
        email: false,
        password: false
      });
      Object.keys(errorFields).forEach((fieldName) => {
        const element = document.getElementById(fieldName);
        if (element) {
          element.classList.remove("error-border");
        }
      });
      return isValid;
    }
    if (
      email === "" ||
      password === ""
    ) {
      Object.assign(errorFields, {
        email: email === "",
        password: password === ""
      });
      errorMsg = "Please enter email and password";
      isValid = false;
    }
    setError(hasError);
    NotifyUser(appLabels.toastMessage.labels.error, errorMsg);
    Object.keys(errorFields).forEach((fieldName) => {
      const element = document.getElementById(fieldName);
      if (element) {
        if (errorFields[fieldName]) {
          element.classList.add("error-border");
        } else {
          element.classList.remove("error-border");
        }
      }
    });
    return isValid;
  }

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
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="passwordContainer">
              <label>{appLabels.signup.labels.password}</label>
              <div style={{ position: 'relative' }}>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  className="form-control form-control-sm"
                  placeholder='Enter password'
                  value={password}
                  onChange={handlePasswordChange}
                />
                {password && (
                  <span
                    className='passwordToggleIcon'
                    onClick={handlePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                )}
              </div>
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
          <Button onClick={handleSubmitForm}>{appLabels.signup.button[isLogin ? "login" : "signup"]}</Button><br/>
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