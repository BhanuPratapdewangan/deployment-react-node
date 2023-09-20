import React from 'react'
import { Link } from 'react-router-dom'

const InvalidComponent = () => {
  return (
    <div>
        <h3 className='text-danger'>Invalid UserId | Password</h3>
        <Link to="/signin">Try again</Link>
    </div>
  )
}

export default InvalidComponent;