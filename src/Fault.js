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

annotations(Highcharts)
accessibility(Highcharts)

const demoChart = {
  title: {
      text: 'Analysis for fault #1'
  },

  yAxis: {
    title: {
      text: 'Temperature'
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

  annotations: [{
    labelOptions: {
      backgroundColor: 'rgba(255,200,200,0.5)',
      verticalAlign: 'top',
      y: 15
    },
    labels: [{
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 10,
        y: 80
      },
      text: 'Warning: economizer on'
    }]
  }],

  series: [{
    name: 'OSAT',
    data: [60, 61, 63, 70, 80, 74, 73, 73, 74, 72, 70, 68, 65, 63, 62, 61, 60]
  }, {
    name: 'RAT',
    data: [65, 66, 67, 72, 75, 75, 75, 76, 77, 76, 75, 73, 71, 69, 68, 67, 66]
  }]
}

class Fault extends Component {
  render() {
    return(
      <div>
        <Container fluid>
          <Row>
            <Col xs={8}>
              <HighChartsReact Highcharts='highcharts' options={demoChart} />
            </Col>
            <Col xs={4}>
              <Card bg="Light">
                <Card.Header>
                  Highlighting
                </Card.Header>
                <Card.Body>
                  <Button variant='warning'>Line 1</Button>
                  <Button variant='warning'>Line 2</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/'>
                <Button variant='secondary'>Home</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

 }

 export default Fault;