import React, { Component } from 'react';
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

class testReading extends Component {
  state = {
    data: [],
    isLoading: true
  }

  async dataLoader() {
    const url = 'https://capstone4.blob.core.windows.net/capstone-2020-05-19-container-5/a_b.json'
    await fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
        })
      });
  }

  handleClickDefault = () => {
    this.setState({
      isLoading: true
    })
  }

  handleClickLoad = () => {
    this.dataLoader();

    this.setState({
      isLoading: false
    })
  }

  render() {
    var {data} = this.state;
    
    if (!this.state.isLoading) {
    return(
      <div>
        <Card bg="Light">
            <Card.Header>
                TESTING READING
            </Card.Header>
            <Card.Text>
                <ul>
                    {data.map((user, index) => (
                        <li key={index}>
                          UserNAME: {user.name}
                       </li>
                    ))}
                </ul>
            </Card.Text>
            <Card.Body>
                <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
                <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
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
                    <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
                    <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
                </Card.Body>
            </Card>
            <Link to='/'>
                <Button variant='secondary'>Home</Button>
            </Link>
        </div>
    )
  }
}

}

 export default testReading;