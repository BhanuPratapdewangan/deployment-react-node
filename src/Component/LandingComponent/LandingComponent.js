import React from 'react'
import "./LandingComponent.css";
import { Link } from 'react-router-dom';

const LandingComponent = () => {
  return (
    <div className='container-fluid d-flex justify-content-between border border-1 '>
        <div className='mt-2'>
            <h3>LMS</h3>
        </div>
        <div className='mt-2'>
            <Link to="/signin" className='link'>SignIn</Link>
            <Link to="/signup" className='ms-3 link'>SignUp</Link>
        </div>
    </div>
  )
}

export default LandingComponent;