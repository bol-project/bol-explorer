import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import BlockListElement from "../Home/BlockListElement";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Container, FormGroup, FormText, Input, Label, ListGroup, ListGroupItem,
    Nav, NavItem, NavLink, TabContent, Table, TabPane,
    UncontrolledCarousel,
    UncontrolledTooltip
} from "reactstrap";
import classnames from "classnames";
import PerfectScrollbar from "perfect-scrollbar";
import Pagination from "reactstrap/es/Pagination";
import PaginationItem from "reactstrap/es/PaginationItem";
import PaginationLink from "reactstrap/es/PaginationLink";

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var blockUrl = "https://api.neoscan.io/api/main_net/v1/get_block/";

const carouselItems = [
    {
        src: require("assets/img/denys.jpg"),
        altText: "Slide 1",
        caption: "Big City Life, United States"
    },
    {
        src: require("assets/img/fabien-bazanegue.jpg"),
        altText: "Slide 2",
        caption: "Somewhere Beyond, United States"
    },
    {
        src: require("assets/img/mark-finn.jpg"),
        altText: "Slide 3",
        caption: "Stocks, United States"
    }
];

let ps = null;

class Block extends Component {

    constructor() {
        super();
        this.state = {
            "tabs": 1
        };
    }

    componentWillMount() {
        fetch('https://5d712628d3448a001411b54a.mockapi.io/' + this.props.match.params.blockHash)
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and parse data to component
                data = data.splice(1);
                this.setState({
                    blockHash: data[0].blockHash,
                    blockHeight: data[0].blockHeight,
                    timestamp: data[0].timestamp,
                    blockProducer: data[0].blockProducer,
                    size: data[0].size,
                    version: data[0].version,
                    numberOfTransactions: data[0].transactions.length,
                    merkleRoot: data[0].merkleRoot,
                    previousBlock: data[0].previousBlock,
                    nextBlock: data[0].nextBlock,
                    currentWorldPopulation: data[0].currentWorldPopulation,
                    newRegisteredPeople: data[0].newRegisteredPeople,
                    totalCommunityPeople: data[0].totalCommunityPeople,
                    worldWalletAmount: data[0].worldWalletAmount,
                    distributePerPerson: data[0].distributePerPerson
                });
            })
            .catch(console.log)
    }

    render() {

        var dtFormat = Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});

        return (
            <div className="view-page">
                <div className="Block">
                    <div className="wrapper">
                        <Container className="align-items-center">
                            <Row>
                                <Col md="4">
                                    <hr className="line-info" />
                                    <h4>
                                        Hash:
                                        <span className="text-info">{this.state.blockHash}</span>
                                    </h4>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="align-items-center">
                            <Row>
                                <Col lg="6" md="6">
                                    <Row>
                                        <Col>
                                            <h1>Producer: {this.state.blockProducer}</h1>
                                            <h1>Version: {this.state.version}</h1>
                                            <h1>Height: {this.state.blockHeight}</h1>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="ml-auto mr-auto" lg="4" md="6">
                                    <Card className="card-coin card-plain">
                                        <CardHeader>
                                            <img alt="..." className="img-center img-fluid rounded-circle" src={require("assets/img/mike.jpg")}/>
                                            <h4 className="title">Block Info</h4>
                                            <p class="text-muted">{dtFormat.format(this.state.timestamp)}</p>
                                        </CardHeader>
                                        <CardBody>
                                            <Nav className="nav-tabs-primary justify-content-center"></Nav>
                                            <TabContent className="tab-subcategories" activeTab={"tab" + this.state.tabs}>
                                                <TabPane tabId="tab1">
                                                    <div><h4 className="title">Number of Transactions: {this.state.numberOfTransactions}</h4></div>
                                                    <div><h4 className="title">Current World Population: {this.state.currentWorldPopulation}</h4></div>
                                                    <div><h4 className="title">New Registered People: {this.state.newRegisteredPeople}</h4></div>
                                                    <div><h4 className="title">Total Community People: {this.state.totalCommunityPeople}</h4></div>
                                                    <div><h4 className="title">Distribute per Person:{this.state.distributePerPerson}</h4></div>
                                                    <div><h4 className="title">World Wallet Amount: {this.state.worldWalletAmount}</h4></div>
                                                    <div><h4 className="title">Size: {this.state.size}</h4></div>
                                                    <div><h4 className="title">Merkle Root: {this.state.merkleRoot}</h4></div>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col lg="8" md="8">
                                </Col>
                                <Col lg="3" md="3">
                                <Pagination>
                                    <PaginationItem>
                                        <PaginationLink href={`../block/${this.state.previousBlock}`}>
                                            Previous
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink>
                                            <p class="text-muted">Blocks</p>
                                        </PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationLink href={`../block/${this.state.nextBlock}`}>
                                            Next
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                                </Col>
                            </Row>
                        </Container>
                    </div>


                    {/*<h2>Block Info</h2>*/}
                    {/*<Row>*/}
                        {/*<Col>*/}
                            {/*<div><h4 className="title">Block Hash: {this.state.blockHash}</h4></div>*/}
                            {/*<div><h2 className="title">Block Height: {this.state.blockHeight}</h2></div>*/}
                            {/*<div><h3 className="title">Date: {dtFormat.format(this.state.timestamp)}</h3></div>*/}
                            {/*<div><h4 className="title">Current World Population: {this.state.currentWorldPopulation}</h4></div>*/}
                            {/*<div><h2 className="title">Size: {this.state.size}</h2></div>*/}
                            {/*<div><h3 className="title">New Registered People: {this.state.newRegisteredPeople}</h3></div>*/}
                            {/*<div><h4 className="title">Previous Block: <Link to={`../block/${this.state.previousBlock}`}>{this.state.previousBlock}</Link></h4></div>*/}
                        {/*</Col>*/}
                        {/*<Col>*/}
                            {/*<div><h4 className="title">Merkle Root: {this.state.merkleRoot}</h4></div>*/}
                            {/*<div><h2 className="title">Block Producer: {this.state.blockProducer}</h2></div>*/}
                            {/*<div><h3 className="title">Version:{this.state.version}</h3></div>*/}
                            {/*<div><h4 className="title">Total Community People: {this.state.totalCommunityPeople}</h4></div>*/}
                            {/*<div><h2 className="title">World Wallet Amount: {this.state.worldWalletAmount}</h2></div>*/}
                            {/*<div><h3 className="title">Distribute per Person:{this.state.distributePerPerson}</h3></div>*/}
                            {/*<div><h3 className="title">Size: {this.state.size}</h3></div>*/}
                            {/*<div><h4 className="title">Next Block: <Link to={`../block/${this.state.nextBlock}`}>{this.state.nextBlock}</Link></h4></div>*/}
                            {/*<div><h4 className="title">Number of Transactions: {this.state.numberOfTransactions}</h4></div>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}


                </div>
            </div>
        );
    }
}
export default Block;