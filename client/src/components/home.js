import React from 'react'
// import '../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './navbar';
import Button from 'react-bootstrap/Button';
import ins from './increase.png';
import {Link} from "react-router-dom";
import { useState } from 'react';

function Home() {
  
  return (
    <Container className='vh-100 bg' fluid>
      <Row>
        <Navbar />
      </Row>
      <Row className=''>
        <Col className="d-flex justify-content-center mt-5" sm={12}>
          <h1> Welcome to</h1>
          {/* <h3>Save your hard earm money </h3> */}
        </Col>
        <Col className="d-flex justify-content-center" sm={12}>
          <h1 className='text-primary'> <b>Virtual trading platform</b> </h1>
        </Col>
        <Col className="d-flex justify-content-center" sm={12}>
        <p>Save your hard earn money </p>
        </Col>      
      </Row>
      <Row >
        <Col className="d-flex justify-content-end mt-3"> <Button variant="primary" className="px-5 py-2" ><Link className="text-white" to="/signin">login</Link></Button></Col>
        <Col className="mt-3"> <Button variant="outline-success" className="px-5 py-2"  onsubmit><Link className="text-scondary" to="/signup">Signup</Link></Button></Col>
      </Row> 
    

    </Container>
  )
}

export default Home