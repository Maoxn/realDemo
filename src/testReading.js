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

import { Aborter, ServiceURL, ContainerURL, StorageURL, AnonymousCredential } from "@azure/storage-blob";

const account = 'staticwebsitedemo'
const container = '$web'

accessibility(Highcharts)

class testReading extends Component {
  state = {
    data: [],
    markers: [],
    prefix: "",
    pages: 2,
    isLoading: true
  }

  listBlobs(state, instance) {
    // this lists Blobs in pages defined in state.pageSize
    this.setState({ loading: true });

    // Use AnonymousCredential since $web container is made a 'public container' 
    // and does not require authorization
    const anonymousCredential = new AnonymousCredential();
    const pipeline = StorageURL.newPipeline(anonymousCredential);

    const serviceURL = new ServiceURL(
        `https://${account}.blob.core.windows.net`,
        pipeline
    );

    // If you are using a SAS token, simply append to ContainerURL here. 
    // We will use anonymous access hence no SAS token
    const containerName = container //+ `?st=2018-11-06T06%3A15%3A24Z&se=2019-11-07T06%3A15%3A00Z&sp=rl&sv=2018-03-28&sr=c&sig=4vCT7aInDWRiypkuYlezN8dos0K2h2DvQ0pnNkMJSFs%3D`;
    const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    
    // Fetch the prefix in the query params to browse into folders
    const urlParams = new URLSearchParams(window.location.search);
    const prefix = urlParams.get('prefix');

    // List objects from Blob storage using the prefix
    // Delimiter for virtual directories is a forward slash '/' here
    containerURL.listBlobHierarchySegment (
        Aborter.none,
        "/",
        state.markers[state.page],
        {
            maxresults: state.pageSize,
            prefix: prefix
        }
    ).then(res => {
        // Store the nextMarker in an array for prev/next buttons only if there are more blobs to show
        const markers = state.markers.slice();
        var totalPages = state.page+1;
        if (res.nextMarker) {
            markers[(state.page+1)] = res.nextMarker;
            totalPages++;
        }
          
        // Combine the found virtual directories and files
        Array.prototype.push.apply(res.segment.blobItems, res.segment.blobPrefixes)

        // Store the state
        this.setState({
            data: res.segment.blobItems,
            pages: totalPages,
            markers: markers,
            prefix: prefix,
            isLoading: false,
        });
    });
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
    this.listBlobs();
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
                      {data.map((blob, index) => (
                        <li key={index}>
                          {blob.title}
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