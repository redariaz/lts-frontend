import React from 'react'
import './styles/custom-styles.css';

function Login() {
  return (
    <div className='outerContainer'>
      <div className="loginContainer">
        <h3>Sign up/in to get started!</h3>
        <div className="emailContainer">
            <label>Email</label>
            <input
              type="text"
              className='form-control form-control-sm'
            />
        </div>
      </div>
    </div>
  )
}

export default Login