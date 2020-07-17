import React, { Component } from 'react';
import './Fault.css';
import { Aborter, ServiceURL, ContainerURL, StorageURL, AnonymousCredential } from "@azure/storage-blob";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
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

class Test extends Component {
  state = {
    data: [],
    chartOptions: {
      title: {
        text: 'Analysis for fault '+this.props.match.params.id
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

      series: [{
        name: 'Scheduled valve status',
        pointStart: 10,
        data: [2, 3, 3, 3, 4, 5, 6, 5, 5, 3]
      }, {
        name: 'Actual status',
        pointStart: 12,
        data: [3, 3, 4, 5, 7, 8, 10, 12, 7, 5]
      }]
    },
    isLoading: true
  }

    handleClickRange = () => {
    const newArray1 = [2, 3, 3, 3, 4, 5, 6, 5, 5, 3];
    const newArray2 = [3, 3, 4, 5, 7, 8, 10, 12, 7, 5];

    this.setState({
      chartOptions: {
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
  
        series: [{
          name: 'Scheduled valve status',
          pointStart: 15,
          data: newArray1
        }, {
          name: 'Actual status',
          pointStart: 15,
          data: newArray2
      }]}
    })
  }

  handleClickBand = () => {
    this.setState(
      {chartOptions: {
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
        },
        plotBands: [{
          from: 18,
          to: 20,
          color: 'rgba(168, 170, 213, .2)'
        }]
      },

      series: [{
        name: 'Scheduled valve status',
        data: [2, 3, 3, 3, 4, 5, 6, 5, 5, 3]
      }, {
        name: 'Actual status',
        data: [3, 3, 4, 5, 7, 8, 10, 12, 7, 5]
      }]}
      }
    )
  }

  handleClickDefault = () => {
    this.setState(
      {chartOptions: {
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
          format: '{value}:01'
        },
        accessibility: {
          rangeDescription: 'Range: 6 to 22'
        },
        plotBands: null
      },

      series: [{
        name: 'Scheduled valve status',
        pointStart: 10,
        data: [2, 3, 3, 3, 4, 5, 6, 5, 5, 3]
      }, {
        name: 'Actual status',
        pointStart: 12,
        data: [3, 3, 4, 5, 7, 8, 10, 12, 7, 5]
      }]},
      isLoading: true
      }
    )
  }

  async dataLoader() {
    const url = 'instructions/'+this.props.match.params.id;
    await fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          isLoading: false
        })
      });
  }

  handleClickDefault() {
    this.setState({
      data: [],
      isLoading: true
    })
  }

  handleClickLoad() {
    this.dataLoader();
    console.log(this.state.data)
  }

  render() {
    var { data, isLoading } = this.state
    if (!isLoading) {
      return(
        <div>
          <header className="Fault-header">
            <p style={{color: "white"}}>
              ANALYSIS PAGE
            </p>
          </header>

          <Container fluid>
            <Row>
              <Col xs={8}>
                <HighChartsReact Highcharts='highcharts' options={this.state.chartOptions} />
              </Col>
              <Col xs={4}>
          <Card bg="Light" fluid>
            <Card.Header>
              Instructions for fault {this.props.match.params.id}
            </Card.Header>
            <Card.Text>
              <ul>
                <li>Time: {data.Time}</li>
                <li>Range: {data.TimeRange}</li>
              </ul>
            </Card.Text>
            <Card.Body>
              <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
              <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
            </Card.Body>
          </Card>
          <Card bg="Light" fluid>
            <Card.Header>
              Options
            </Card.Header>
            <Card.Text>
              Some useful buttons
            </Card.Text>
            <Card.Body>
              <Button variant='warning' onClick={() => this.handleClickRange()}>range</Button>
              <Button variant='warning' onClick={() => this.handleClickBand()}>band</Button>
              <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
            </Card.Body>
          </Card>
            </Col>
          </Row>
        </Container>

          <Link to='/'>
            <Button variant='secondary'>Home</Button>
          </Link>
        </div>
      )
    } else {
      return (
        <div>
          <header className="Fault-header">
            <p style={{color: "white"}}>
              ANALYSIS PAGE
            </p>
          </header>

          <Container fluid>
            <Row>
              <Col xs={8}>
                <HighChartsReact Highcharts='highcharts' options={this.state.chartOptions} />
              </Col>
              <Col xs={4}>
          <Card bg="Light" fluid>
            <Card.Header>
              Instructions for fault {this.props.match.params.id}
            </Card.Header>
            <Card.Text>
              Press load for instructions
            </Card.Text>
            <Card.Body>
              <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
              <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
            </Card.Body>
          </Card>
          <Card bg="Light" fluid>
            <Card.Header>
              Options
            </Card.Header>
            <Card.Text>
              Some useful buttons
            </Card.Text>
            <Card.Body>
              <Button variant='warning' onClick={() => this.handleClickRange()}>range</Button>
              <Button variant='warning' onClick={() => this.handleClickBand()}>band</Button>
              <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
            </Card.Body>
          </Card>
            </Col>
          </Row>
        </Container>

          <Link to='/'>
            <Button variant='secondary'>Home</Button>
          </Link>
        </div>
      )
    }
  }

}

 export default withRouter(Test);