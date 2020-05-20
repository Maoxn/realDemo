import React, { Component } from 'react';
import logo from './logo.svg';
import './Front.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'
import PopoverTitle from 'react-bootstrap/PopoverTitle'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

class Front extends Component {
  state = {
    urlAHU: "https://d3i71xaburhd42.cloudfront.net/8fbd9f2d6e5afe43e0cd5597f7f410728474b872/3-Figure1-1.png",
    selected: "SAT",
  }

  handleContent = selectedItem => {
    this.setState(
      {selected: selectedItem},
    )
  }

  render() {
    return (
      <div className="Front">
        <header className="Front-header">
          <Container>
            <Row>
              <Col xs={2}>
                <img src="https://tignis.com/wp-content/uploads/2018/08/tignis-logo.png" className="App-logo" alt="logo" />
              </Col>
              <Col xs={8}>
                <p style={{color: "grey"}}>
                 WELCOME TO<br/>
                 FAULT DETECTION SYSTEM
                </p>
              </Col>
            </Row>
          </Container>
        </header>

        <Nav
          fill variant="pills" defaultActiveKey="SAT"
          onSelect={(selectedKey) => this.handleContent(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="SAT"><strong>SAT</strong></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="MAT"><strong>MAT</strong></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="LAT"><strong>LAT</strong></Nav.Link>
          </Nav.Item>
        </Nav>

        <Page selectedPair={this.state} />
      </div>
    );
  }
}

class Page extends Component {
  state = {
    dataType: "past week"
  }

  handleSpan = selectedItem => {
    this.setState(
      {dataType: selectedItem},
    )
  }

  render() {
    return(
      <div>
        <Container fluid>
          <Row>
            <Col xs={8}>
              <Image
                src={this.props.selectedPair.urlAHU}
                fluid
                thumbnail
              />
            </Col>
            <Col xs={4}>
              <Card bg="Light">
                <Card.Header>
                  <Nav
                    variant="tabs" defaultActiveKey="past week"
                    onSelect={(selectedKey) => this.handleSpan(selectedKey)}
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="past week">PW</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="past month">PM</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="past year">PY</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    A plot of <strong>{this.state.dataType}</strong><br/>
                    The datatype is <em>{this.props.selectedPair.selected}</em>
                  </Card.Text>
                  <Image
                    src="https://os.alipayobjects.com/rmsportal/VVPAIRTNYwbbZut.jpg"
                    fluid
                    rounded
                  />

                  
                  <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay=
                      <Popover id="popover-test" style={{width:"100rem"}}>
                        <Popover.Title as="h3">Really detailed version!</Popover.Title>
                        <Popover.Content>
                          <Image
                            src="https://os.alipayobjects.com/rmsportal/VVPAIRTNYwbbZut.jpg"
                            fluid
                            rounded
                          />
                        </Popover.Content>
                      </Popover>
                  >
                    <Button variant="secondary">See more</Button>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
              <Jumbotron fluid style={{ height: "9.5rem"}}>
                <Dropdown>
                  <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    Faults
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      <Link to="/fault">4pm - Economizer</Link>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <Link to="/fault2">9am - Schedule</Link>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Some more</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Optimizations
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Optimization 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Optimization 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Optimization 3</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Optimization 4</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Optimization 5</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Optimization 6</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default Front;