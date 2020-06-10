import React, { useEffect,useState } from 'react';
import './Fault.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Highcharts from 'highcharts'
import annotations from 'highcharts/modules/annotations'
import accessibility from 'highcharts/modules/accessibility'
import HighChartsReact from 'highcharts-react-official'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

accessibility(Highcharts)





function Testbackend() {
       
    const[currentTime,setCurrentTime] =useState(0);
    const[isLoading,setLoading]=useState(true);


    useEffect(() => {
        fetch('/instructions/id').then(res => res.json()).then(data => {
          //console.log(data)
          //setCurrentTime(data[0]);
       });
      }, []);


 


const loadBackend=()=> {
    fetch('/instructions').then(res => res.json()).then(data => {
        for (var key in data[0])
          console.log(key);
          setCurrentTime(key);
      });
    setLoading(false);
    
  }

const handleClickDefault = () => {
      setLoading(true);
      
    
  }


 
   

    if (!isLoading) {
    return(
      <div>
        <Card bg="Light">
            <Card.Header>
                TESTING Backend
            </Card.Header>
            <Card.Text>
                <ul>
                    <li >
                        Fault:{currentTime}
                    </li>
                </ul>
            </Card.Text>
            <Card.Body>
                <Button variant='success' onClick={() => handleClickDefault()}>default</Button>
                <Button variant='primary' onClick={() => loadBackend()}>load</Button>
            </Card.Body>
        </Card>
        <Link to='/'>
            <Button variant='secondary'>Home</Button>
        </Link>
      </div>
    )
    } else {
    return (
        <div>
            <Card bg="Light">
                <Card.Header>
                    TESTING READING
                </Card.Header>
                <Card.Text>
                    Press load button to see something here
                </Card.Text>
                <Card.Body>
                    <Button variant='success' onClick={() => handleClickDefault()}>default</Button>
                    <Button variant='primary' onClick={() => loadBackend()}>load</Button>
                </Card.Body>
            </Card>
            <Link to='/'>
                <Button variant='secondary'>Home</Button>
            </Link>
        </div>
    )
  }
}


 export default Testbackend;
