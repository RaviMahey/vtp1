import React, { useState } from 'react'
import '../App.css'
import Navbar from './navbar';
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';


const Signup = () => {
  const history = useNavigate();
  const [userRegi, setUserRegi] = useState(
    {
      name: "",
      email: "",
      password: ""
    }
  );
  // let name,value;
  const handleInputs = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setUserRegi({ ...userRegi, [name]: value });
    // console.log(userRegi);

  }
  const submitForm= async (e)=>{
    e.preventDefault();
    console.log(userRegi);
    const {name ,email, password}=userRegi;
    const res= await fetch("/register",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(
        {
          name,
          email,
          password
        }
      )

    });
    const data= await res.json();
    if(res.status===422 || !res){
      console.log("invalid eror");
      window.alert("invalid error")
    }
    else {
      console.log("sucess");
      history("/signin");

    }

  }


  return (
    <Container className='vh-100 ' fluid>

      <Row>
        <Navbar />
      </Row>
      <Row className="justify-content-center   ">
        <div className="col-md-4 col-sm-8 mt-5 shadow p-5 rounded bg-white">
          <Form method="POST" >
            <Form.Group method="POST" className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={userRegi.name} onChange={handleInputs} placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={userRegi.email} onChange={handleInputs} placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={userRegi.password} onChange={handleInputs} placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={submitForm}>
              Sign up
            </Button>
          </Form>
        </div>
      </Row>
    </Container>


  )
}

export default Signup