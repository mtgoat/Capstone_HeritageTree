import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(UserProfileContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, displayName, email };
      register(userProfile, password)
        .then(() => navigate("/"));
    }
 };

  return (
    <div className="login__container">
         <img
        src={require("../../logo/app-logo.png")}
        alt="Heritage Tree Logo"
        className="app-logo__login"
      />

<div className="screen2">
        <div className="screen__content2">
          <h4 className="screen__content2__title"><b >Registration Form</b></h4>
    <Form onSubmit={registerClick}>
    <Row>
      <Col><FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
      </Col>
      <Col>
      <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
      </Col>
    </Row>

        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
       
            <Button>Register</Button>
           
          
        </FormGroup>
      
    </Form>
    <Link to="/login">
    <Button > Go back to Login</Button></Link>
    </div> </div> </div>
  );
}