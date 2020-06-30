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
    //const[currentFault,setCurrentFault] =useState(0);

    //useEffect is called after each render and when setState is used inside of it
    //it will cause the component to re-render which will call useEffect and so on and so on.
    //called after the first mount/render only.
    // useEffect(() => {
    //     fetch('/instructions').then(res => res.json()).then(data => {
    //      //console.log(data[0].faultType)
    //       setCurrentFault(data[0].faultType);

    //     });
    //   }, []);

const loadBackend=()=> {
    fetch('/instructions').then(res => res.json()).then(data => {
        setCurrentTime(data[0].faultType);
        //console.log(currentTime)
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
                         {currentTime}
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