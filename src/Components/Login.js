import React from 'react'
import './styles/custom-styles.css';
import { Card } from 'react-bootstrap';

function Login() {
  return (
    <div className='outerContainer'>
      <div className="loginContainer">
        <Card>
          <Card.Header class='cardHeader'>Sign up!</Card.Header>
        </Card>
      </div>
    </div>
  )
}

export default Login