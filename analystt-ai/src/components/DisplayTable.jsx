import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const DisplayTable = ({data}) => {

    const [state, setState] = useState([]);

    const [open, setOpen] = useState(false);

    const getData = () => {
        axios.get("https://swapi.dev/api/people").then(data=>{
            console.log(data["data"].results);
            setState(data["data"].results)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        getData();
    },[])


  return (
        
    <div className="container">
        <Table className = "table table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td> <h5>Mass</h5> </td>
                    <td> <h5>Height</h5> </td>
                    <td> <h5>Gender</h5> </td>
                    <td> <h5>View</h5> </td>
                </tr>

            </thead>
            <tbody>
                {
                    state.map(ele=>(
                        <tr key={ele.name}>
                            <td>{ele.name}</td>
                            <td>{ele.mass}</td>
                            <td>{ele.height}</td>
                            <td>{ele.gender}</td>
                            <td>
                                <>
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                    View Details
                                </Button>
                                <Collapse in={open}>
                                    <div id="example-collapse-text">
                                        <p><h6>Birth Year :</h6><ul>{ele.birth_year}</ul> </p>
                                        <p><h6>Skin Color :</h6><ul>{ele.skin_color}</ul> </p>
                                        <p><h6>Hair Color :</h6><ul>{ele.hair_color}</ul> </p>
                                        <p><h6>Eye Color :</h6><ul>{ele.eye_color}</ul> </p>
                                    
                                    </div>
                                </Collapse>
                                </>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </div>
  )
}

export default DisplayTable
