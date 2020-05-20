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
          pointStart: 1
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

  async componentDidMount() {
    const url = 'https://capstone4.blob.core.windows.net/capstone-2020-05-19-container-5/small_radio.json'
    await fetch(url, { method:'GET', mode:'cors' })
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json,
        })
      });
  }

  handleClickRand1 = () => {
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
        }
      },

      series: [{
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
        }
      },

      series: [{
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
        }
      },

      series: [{
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

    this.state.users.map(user => {
      array1.push(parseFloat(user.userId))
      array2.push(parseFloat(user.sessionId))
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
          rangeDescription: 'Range: 1 to 10'
        }
      },

      yAxis: {
        title: {
          text: 'Value'
        }
      },

      series: [{
        name: 'lat',
        data: array1
      }, {
        name: 'lng',
        data: array2
      }]},
      isLoading: false
      }
    )
  }

  handleClickLoadp = () => {
    const array1 = [];
    const array2 = [];

    this.state.users.map(user => {
      array1.push(parseFloat(user.userId))
      array2.push(parseFloat(user.sessionId))
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
        data: array1.slice(0, 6)
      }, {
        name: 'lng',
        data: array2.slice(0, 6)
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
                          userID: {user.userId} | sessionID: {user.sessionId}
                       </li>
                      ))}
                    </ul>
                </Card.Text>
                <Card.Body>
                  <Button variant='warning' onClick={() => this.handleClickRand1()}>rand1</Button>
                  <Button variant='warning' onClick={() => this.handleClickRand2()}>rand2</Button>
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
                  <Button variant='warning' onClick={() => this.handleClickRand1()}>rand1</Button>
                  <Button variant='warning' onClick={() => this.handleClickRand2()}>rand2</Button>
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

 export default Fault2;