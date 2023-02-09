import React, {useState}from 'react'
import '../App.css'
import Navbar from './navbar';
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history= useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(
        {
          email,
          password
        }
      )
    });
    const data = res.json();
    if(res.status===422 || !data){
      window.alert("invalid email/password");
      console.log("invalid");

    }
    else {
        console.log("login sucessfull");
        history('/dash');
    }


  }
  return (
    // <div></div>
    <Container fluid className=" vh-100 ">
      <Row  >
        <Navbar />
      </Row>
      <Row className='justify-content-center  '>
        <div className='col-sm-6 col-md-4 border bg-white p-5 rounded mt-5 shadow '>
          <Form method='POST'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Button className='ml-5' variant="primary" onClick={loginUser} type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  )
}

export default Signin