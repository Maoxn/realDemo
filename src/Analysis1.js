import React, { Component } from 'react';
import './Analysis.css';

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

class Analysis1 extends Component {
  state = {
    chartOptions: {
      title: {
        text: 'Analysis for fault #1'
      },

      yAxis: {
        title: {
          text: 'Valve status/%'
        }
      },

      xAxis: {
        title: {
          text: 'Time stamp'
        }
      }
    },

    users: [],
    isLoading: true
  }

  async dataLoader() {
    const url = '/instructions/1'
    await fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json,
        })
      });

    for (var key in this.state.users) {
      console.log(key)
      console.log(this.state.users[key])
    }
      
  }

  handleClickRange = () => {
    const newArray1 = [2, 3, 3, 3, 4, 5, 6, 5, 5, 3];
    const newArray2 = [3, 3, 4, 5, 7, 8, 10, 12, 7, 5];

    //const newChartOptions = this.state.chartOptions;
    //newChartOptions.series[0].update({
      //pointStart: 15
    //})

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
          format: '{value}:00'
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
        pointStart: 15,
        data: [3, 3, 4, 5, 7, 8, 10, 12, 7, 5]
      }]},
      isLoading: true
      }
    )
  }

  handleClickLoad = () => {
    this.dataLoader();

    const array1 = [3, 3, 4, 5, 7, 8, 10, 12, 7, 5];

    //let length = this.state.users.length;
    //for (let i = 2; i < length-1; i++) { 
      //array1.push(parseFloat(this.state.users[i].address.geo.lat))
      //array2.push(parseFloat(this.state.users[i].address.geo.lng))
    //}

    this.setState(
      {chartOptions: {
      xAxis: {
        title: {
          text: 'User ID'
        },
        labels: {
          format: 'id:{value}'
        },
        accessibility: {
          rangeDescription: 'Range: 1 to 25'
        }
      },

      yAxis: {
        title: {
          text: 'Value'
        }
      },

      series: [{
        name: 'lat',
        pointStart: 1,
        data: array1
      }]},
      isLoading: false
      }
    )
  }

  handleClickLoadp = () => {
    this.dataLoader();

    const array1 = [];
    const array2 = [];

    this.state.users.map(user => {
      array1.push(parseFloat(user.address.geo.lat))
      array2.push(parseFloat(user.address.geo.lng))
    })

    this.setState(
      {chartOptions: {
      xAxis: {
        title: {
          text: 'User ID'
        },
        labels: {
          format: 'id:{value}'
        },
        accessibility: {
          rangeDescription: 'Range: 2 to 5'
        }
      },

      yAxis: {
        title: {
          text: 'Value'
        }
      },

      series: [{
        name: 'lat',
        pointStart: 3,
        data: array1.slice(2, 7)
      }, {
        name: 'lng',
        pointStart: 3,
        data: array2.slice(2, 7)
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
                  test
                </Card.Text>
                <Card.Body>
                  <Button variant='warning' onClick={() => this.handleClickRange()}>range</Button>
                  <Button variant='warning' onClick={() => this.handleClickBand()}>band</Button>
                  <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
                  <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
                  <Button variant='primary' onClick={() => this.handleClickLoadp()}>partLoad</Button>
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
                  <Button variant='warning' onClick={() => this.handleClickRange()}>range</Button>
                  <Button variant='warning' onClick={() => this.handleClickBand()}>band</Button>
                  <Button variant='success' onClick={() => this.handleClickDefault()}>default</Button>
                  <Button variant='primary' onClick={() => this.handleClickLoad()}>load</Button>
                  <Button variant='primary' onClick={() => this.handleClickLoadp()}>partLoad</Button>
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

}

 export default Analysis1;