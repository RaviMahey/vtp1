import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './search'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import Wlist from './wlist';
import DashNav from './dashNav';
import '../App.css';
import Ordermodel from './ordermodel';
import { Form } from 'react-bootstrap';
// import user from '../../../server/userschema';
const Dash = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // show A
  const [showA, setShowA] = useState(false);
  const handleCloseA = () => setShowA(false);
  const handleShowA = () => setShowA(true);
  // show B
  const [showB, setShowB] = useState(false);
  const handleCloseB= () => setShowB(false);
  const handleShowB= () => setShowB(true);
  // buy symbol
  const [buysymbol,setBuysymbol]=useState("");
  const [array, setArray] = useState([]);
  const [atwo, setAtwo] = useState([]);
  const history = useNavigate();
  const [userData, setUserData] = useState({});
  function getdata(data) {
    console.log("inside get data function");
    // console.log(data);
    setArray(data);
  };

  function congdata(data) {
    console.log(data);
    if (array.includes(data)) {
      return;
    }
    setArray((itm) => {
      console.log("indise itm");
      return [...itm, data];
    });
    console.log(array);
  };
  const wishdel = async (e) => {
    try {
      const res = await fetch("/wishdelete", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(
          {
            symbol: e.target.value
          }
        )
      });
      const data = await res.json();
      getdata(data)
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch (err) {
      history("/dash")
    }
    // window.location.reload();
  }
  const callAbout = async () => {
    try {
      const res = await fetch('/dashboard', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      // console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch (err) {
      console.log(err);
      history("/signin");
    }
  }


  useEffect(() => {
    callAbout();  
    console.log("inside dash ues");

  }, []);

  return (
    <div className='container-fluid vh-100'>
      <div className="row align-items-center " >
        <div className='col p-0 d-block d-sm-none '>
          <DashNav> </DashNav>
        </div>
        <div className='col-md-3 m-0 col-sm-12 border-right my-2 '>
          <div className='row '>
            <div className='col text-align-enter d-flex justify-content-center '>
              <Button variant="primary" className='w-100' onClick={handleShow}>
                add stock
              </Button>
              {/* search model */}
              <Modal scrollable={true} show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                  <Modal.Title>add stock</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <Search congdata={congdata} ></Search>

                </Modal.Body>
              </Modal>

            </div>
            <div className='col d-flex justify-content-center'>
              <Button variant="primary" className='w-100' onClick={handleShowA}>
                wishlist
              </Button>
              <Modal scrollable={true} show={showA} onHide={handleCloseA} >
                <Modal.Header closeButton>
                  <Modal.Title>wishlist</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <ul className='list-group list-group-flush  '>
                    {/* {array} map array of model wishlist */}
                    <Wlist getdata={getdata} ></Wlist>
                    {array.map((user) => (
                      <li key={user} className='list-group-item'><div className='row'>
                        <div className='col '>{user}</div>
                        <div className='col-2 m-0 p-0'>1234</div>
                        <div className='col-2 me-1 p-0'>
                          <button type="button" value={user} onClick={handleShowB} className="btn btn-sm btn-success w-100">buy</button>
                        </div>
                        <div className='col-2 m-0 p-0'>
                          <button key={user+'w'} type="button" value={user} onClick={wishdel} className="btn btn-sm btn-danger w-100">x</button>
                        </div>
                      </div></li>
                    ))}
                  </ul>
                </Modal.Body>
              </Modal>
            </div>
          </div>

          {/* show wish list element A */}


        </div>
        <div className='col m-0 p-0 d-flex d-none  d-md-block'>
          {/* <Navbar> </Navbar> */}
          <DashNav xyz={userData.name}> </DashNav>
        </div>
      </div>
      {/* print list left side  */}
      <div className='row  border' id="hi" >
        <div className='col-3 h-100 d-none d-md-block p-0 overflow-auto' >
          <ul className='list-group  list-group-flush  '>
            {/* {array} */}
            <Wlist getdata={getdata} ></Wlist>
            {array.map((user) => (
              <li key={user} className='list-group-item'><div className='row'>
                <div className='col '>{user}</div>
                <div className='col-2 m-0 p-0'>1234</div>
                <div className='col-2 me-1 p-0'>
                  <button key={user+'s'} type="button" value={user} onClick={handleShowB} className="btn btn-sm btn-success w-100">buy</button>
                </div>
                <div className='col-2 m-0 p-0'>
                  <button type="button" value={user} onClick={wishdel} className="btn btn-sm btn-danger w-100">x</button>
                </div>
              </div></li>
            ))}
          </ul>
        </div>
        <div className='col h-100 border-start p-0 overflow-auto '>
          orders
          {/* order model */}
          <Modal show={showB} onHide={handleCloseB}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              
             <form className="form-group">
             <input type="number" className="form-control"/ >
             </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseB}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseB}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          
        </div>


      </div>



    </div>


  )
}

/* <NavLink to={'/Lout'}> logout</NavLink>
      <Button variant="primary" onClick={handleShow}>
        add stock
      </Button>
      <Modal scrollable={true} show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>add stock</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Search></Search>

        </Modal.Body>
      </Modal>
      <div className="d-none d-lg-block">
        ravi juamr
      </div> */
export default Dash