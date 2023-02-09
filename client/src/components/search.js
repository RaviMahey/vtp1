import React from 'react'
import { Symbols } from './symbols'
import { useState } from 'react'
const Search = (gdata) => {
    const [count, setCount] = useState("");
    // console.log(count);
    const [add, setAdd] = useState("");
    const handleclick = async (e) => {
        e.preventDefault();
        console.log("inside click of search");
        // gdata = gdata.concat(e.target.value);
        // console.log(gdata);
        gdata.congdata(e.target.value);

        const res = await fetch("/addstock", {
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
        // gdata.congdata(e.target.value);

        // console.log()
    }
    // const handleclick =(e)=>{
    //     // setAdd(e.key)
    //     console.log(e.target.value);
    //     submitForm(e.target.value);
    // }

    return (
        <div className="container-fluid">
            <div className='row mb-3 justify-content-center'>
                <div className='col '>
                    {/* <label for="exampleInputEmail1">Email address</label> */}
                    <input className="form-control " type="search" placeholder="Search" aria-label="Search" onChange={(e) => setCount(e.target.value)} />
                </div>

            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-12'>
                    <ul className=' list-group'>
                        {Symbols.filter((user) => user.symbol.toLowerCase().includes(count)).map((user) => (
                            <li key={user.identifier} className='list-group-item ' >
                                <div className='row'>
                                    <div className='col-9  d-flex align-items-center ' >{user.symbol}</div>
                                    <div className='col'><button type="button" className="btn btn-block btn-primary w-100 btn-sm" value={user.symbol} onClick={handleclick}>add </button>
                                    </div>

                                </div>
                            </li>

                        ))
                        }

                    </ul>

                </div>

            </div>


        </div>

    )
}

export default Search


