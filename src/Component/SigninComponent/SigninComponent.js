import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useCookies } from 'react-cookie';

const SigninComponent = () => {

  const [cookies, setCookies, removeCookies] = useCookies();
  const navigate = useNavigate();
  return (
    <div>
      <h3>SignIn</h3>
      <Formik

        initialValues={{
          UserId: "",
          Password: ""
        }}

        validationSchema={
          yup.object({
            UserId: yup.string().required("UserId required"),
            Password: yup.string().required("Password required").matches(/(?=.*[A-Z])\w{4,15}/, "Password 4 to 15 charactor with atleast one uppercase letter")
          })
        }

        onSubmit={(values) => {
          axios({
            method: "get",
            url: "http://localhost:5500/signin"
          }).then(response => {
            for (var user of response.data) {
              if (user.UserId == values.UserId && user.Password == values.Password) {
                setCookies("userId", values.UserId);
                navigate('/home');
                break;
              } else {
                navigate('/invalid');
              }
            }
          })
        }}
      >

        <Form>
          <dl>
            <dt>User Id</dt>
            <dd><Field type="text" name="UserId" /></dd>
            <dd className='text-danger'><ErrorMessage name="UserId" /></dd>
            <dt>Password</dt>
            <dd><Field type="password" name="Password" /></dd>
            <dd className='text-danger'><ErrorMessage name="Password" /></dd>
          </dl>
          <button type="submit" className="btn btn-success">Signin</button>
          <div>
            <Link to="/signup">New User?Signin</Link>
          </div>
        </Form>

      </Formik>
    </div>
  )
}

export default SigninComponent;