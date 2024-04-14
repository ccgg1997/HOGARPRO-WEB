import React from 'react';
import {
  MDBCardBody,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function Login({setIsLoggedIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = () => {
  setIsLoggedIn(true)
 }

  return (
    <div className="container-fluid p-0">
      <div
        className="d-flex justify-content-end align-items-center"
        style={{
          backgroundImage: 'url(/img/bgOptimizado.jpg',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '85vh',
          backgroundRepeat: 'no-repeat',
          backgroundColor: "purple",
        }}
      >
        <div className="container p-3" style={{ height: '80vh' }}>
          <div className="row" style={{ height: '80%' }}>
            <div className="col-md-6"></div>
            <div className="col-md-6 container-login d-flex justify-content-end align-items-center p-5">
              <MDBCardBody style={{ backgroundColor: 'rgba(255, 255, 255, 0.55)', height: '100%' }} className="d-flex flex-column justify-content-center align-items-center rounded">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                  <span className="h4 fw-bold mt-2 justify-content-center align-items-center">HOGAR PRO SOLUTIONS</span>
                </div>

                <MDBInput wrapperClass='mb-2 mt-4' label='Email address' id='formControlLg' type='email' size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <MDBInput wrapperClass='mb-2' label='Password' id='formControlLg' type='password' size="md"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

                <Button className="mb-2 px-5" color='dark' size='sm' onClick={handleLogin}>Login</Button>
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p>
              </MDBCardBody>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
