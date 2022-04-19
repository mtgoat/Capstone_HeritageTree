import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import './auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      navigate("/")
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <div className="login__container">
         <img
        src={require("../../logo/app-logo.png")}
        alt="Heritage Tree Logo"
        className="app-logo__login"
      />
        <div className="screen">
        <div className="screen__content">
        <h4 className="screen__content__title"><b >Log In</b></h4>
    <Form className="login" onSubmit={loginSubmit}>
      
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
    
    </Form>
    </div>
    </div>
    </div>
  );
}