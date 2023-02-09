import React from 'react'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Wlist = (gdata) => {
  const history = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const callwishlist = async () => {
    try {
      const res = await fetch('/wishlist', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setWishlist(data);
      console.log(data);
      gdata.getdata(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch (err) {
      console.log(err);
      console.log("err wishlist")
      history("/dash");
    }
  }
  useEffect(() => {
    // window.location.reload()
    callwishlist();
    // data.getdata("hahah");
    console.log("inside wishlist");
  }, []);

  return (
    // <></>
    <div>
      {/* <ul className='list-group list-group-flush  '>
        {wishlist.map((user) => (
          <li className='list-group-item'>{user}</li>
        ))}
      </ul> */}
    </div>

  )
}

export default Wlist