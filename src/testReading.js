import React, { Component } from 'react';
import './Fault.css';
import { Aborter, ServiceURL, ContainerURL, StorageURL, AnonymousCredential } from "@azure/storage-blob";

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
// Account name, and the container to list from
const account = 'capstone4'
const container = 'capstone-2020-05-19-container-5'
//const container = '$web'
const containerlink = `https://${account}.blob.core.windows.net/${container}/`




class testReading extends Component {
  state = {
    data: [],
    isLoading: true
  }
  listBlobs(state, instance) {
    // this lists Blobs in pages defined in state.pageSize
    this.setState({ isLoading: true });

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
    console.log(containerURL)
    
    // // Fetch the prefix in the query params to browse into folders
    // const urlParams = new URLSearchParams(window.location.search);
    // List objects from Blob storage using the prefix
    // Delimiter for virtual directories is a forward slash '/' here
    containerURL.listBlobHierarchySegment (
        Aborter.none,
        "/",
    ).then(res => {
          
        // Combine the found virtual directories and files
        Array.prototype.push.apply(res.segment.blobItems, res.segment.blobPrefixes)
        // Store the state
        this.setState({
            data: res.segment.blobItems,
            isLoading: false
        });
});
}

  // async dataLoader() {
  //   const url = 'https://capstone4.blob.core.windows.net/capstone-2020-05-19-container-5/a_b.json'
  //   await fetch(url)
  //     .then(res => res.json())
  //     .then(json => {
  //       this.setState({
  //         data: json,
  //       })
  //     });
  // }

//   renderLink(blobName) {
//     console.log(blobName)
//     var link;
//     if(blobName === "../")
//     {
//         link = "/"
//     }
//     else if(blobName.slice(-1) === "/")
//     {
//         link = "?prefix=" + blobName
//     } else {
//         link = containerlink + blobName
//     }
//     return (
//         //blob name 
//         <a href={link}>
//             {blobName}
//         </a>
//     );
// }

  handleClickDefault = () => {
    this.setState({
      isLoading: true
    })
  }

  handleClickLoad = () => {
    this.listBlobs();

  }
 

  render() {
    const { data, pages, markers, loading, prefix } = this.state;

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
                          Fault: {user.name}
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