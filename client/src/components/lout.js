import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react'
const Lout = () => {
    const history= useNavigate();
    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            header:{
                Accept: "application/json",
                "content-type":"application/json"
            },
            credentials:"include"
        }).then(
            (res)=>{
                history("/signin");                
                if(res.status!= 200){
                    const error = new Error(res.error);
                    throw error;
                }
            }
        ).catch((err)=>{
            console.log(err);
        })

    })
    return (
    <div>   </div>
  )
}

export default Lout