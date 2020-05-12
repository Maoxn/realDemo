import React, { Component } from 'react';
import logo from './logo.svg';
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

class Fault2 extends Component {
  state = {
    chartOptions: {
      title: {
        text: 'Analysis for fault #2'
      },

      yAxis: {
        title: {
          text: 'Valve status/%'
        }
      },

      xAxis: {
        title: {
          text: 'Time stamp'
        },
        labels: {
          format: '{value}:00'
        },
        accessibility: {
          rangeDescription: 'Range: 6 to 22'
        }
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 6
        }
      },

      series: [{
        name: 'Scheduled valve status',
        data: [2, 3, 3, 3, 4, 5, 6, 5, 5, 3]
      }, {
        name: 'Actual status',
        data: [3, 3, 4, 5, 7, 8, 10, 12, 7, 5]
      }]
    },

    users: [],
    isLoading: true
  }

  handleClickRand1 = () => {
    this.setState(
      {chartOptions: {series: [{
        name: 'Scheduled valve status',
        data: [10, 3, 3, 3, 4, 5, 6, 5, 5, 3]
      }, {
        name: 'Actual status',
        data: [3, 3, 4, 5, 7, 8, 10, 12, 7, 5]
      }]}
      }
    )
  }

  handleClickRand2 = () => {
    this.setState(
      {chartOptions: {series: [{
        name: 'Scheduled valve status',
        data: [2, 3, 3, 3, 4, 5, 6, 5, 5, 3]
      }, {
        name: 'Actual status',
        data: [12, 7, 4, 5, 7, 8, 10, 12, 7, 5]
      }]}
      }
    )
  }

  handleClickDefault = () => {
    this.setState(
      {chartOptions: {series: [{
        name: 'Scheduled valve status',
        data: [2, 3, 3, 3, 4, 5, 6, 5, 5, 3]
      }, {
        name: 'Actual status',
        data: [3, 3, 4, 5, 7, 8, 10, 12, 7, 5]
      }]},
      isLoading: true
      }
    )
  }

  handleClickLoad = () => {
    const array1 = [];
    const array2 = [];

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json,
        })
      });

    this.state.users.map(user => {
      array1.push(parseFloat(user.address.geo.lng))
      array2.push(parseFloat(user.address.geo.lat))
    })

    this.setState(
      {chartOptions: {series: [{
        name: 'Scheduled valve status',
        data: array1
      }, {
        name: 'Actual status',
        data: array2
      }]},
      isLoading: false
      }
    )
  }

  render() {
    var {users} = this.state;
    
    if (!this.state.isLoading) {
    return(
      <div>
        <Container fluid>
          <Row>
            <Col xs={8}>
              <HighChartsReact Highcharts='highcharts' options={this.state.chartOptions} />
            </Col>
            <Col xs={4}>
              <Card bg="Light">
                <Card.Header>
                  TESTING FUNCTION
                </Card.Header>
                <Card.Text>
                    <ul>
                      {users.map(user => (
                        <li key={user.id}>
                          Name: {user.name}
                       </li>
                      ))}
                    </ul>
                </Card.Text>
                <Card.Body>
                  <Button variant='warning' onClick={() => this.handleClickRand1()}>rand1</Button>
                  <Button variant='warning' onClick={() => this.handleClickRand2()}>rand2</Button>
                  <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
                  <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/'>Home</Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col xs={8}>
              <HighChartsReact Highcharts='highcharts' options={this.state.chartOptions} />
            </Col>
            <Col xs={4}>
              <Card bg="Light">
                <Card.Header>
                  TESTING FUNCTION
                </Card.Header>
                <Card.Text>
                    Press load button to see something here
                </Card.Text>
                <Card.Body>
                  <Button variant='warning' onClick={() => this.handleClickRand1()}>rand1</Button>
                  <Button variant='warning' onClick={() => this.handleClickRand2()}>rand2</Button>
                  <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
                  <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/'>Home</Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

}

 export default Fault2;