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
import TransactionBlockListElement from "../Home/TransactionBlockListElement";

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
       // fetch('https://5d712628d3448a001411b54a.mockapi.io/' + this.props.match.params.blockHash)
        fetch('http://localhost:5000/api/blocks/' + this.props.match.params.blockHash)
            .then(res => res.json())
            .then((data) => {                   //remove 0 index of OK result and parse data to component
                console.log("data " + JSON.stringify(data));

                // data = data.splice(1);
                this.setState({
                    blockHash: data.hash,
                    blockHeight: data.height,
                    timestamp: data.timestamp,
                    creator: data.creator,
                    size: data.size,
                    version: data.version,
                    numberOfTransactions: data.transactions.length,
                    transactionBlockActivityList: data.transactions.map(item => <TransactionBlockListElement key={item.key} item={item}/>),
                    merkleRoot: data.merkleRoot,
                    previousBlock: data.previousBlock,
                    nextBlock: data.nextBlock,
                    currentWorldPopulation: data.currentWorldPopulation,
                    newRegisteredPeople: data.newRegisteredPeople,
                    totalCommunityPeople: data.totalCommunityPeople,
                    worldWalletAmount: data.worldWalletAmount,
                    distributePerPerson: data.distributePerPerson
                });
            })
            .catch(console.log)


    }

    render() {

        var dtFormat = Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});

        return (
            <div className="view-page">
                <div className="Block">
                    {/*<div className="wrapper">*/}
                    {/*    <Container className="align-items-center">*/}
                    {/*        <Row>*/}
                    {/*            <Col md="4">*/}
                    {/*                <hr className="line-info" />*/}
                    {/*                <h4>*/}
                    {/*                    Hash:*/}
                    {/*                    <span className="text-info">{this.state.blockHash}</span>*/}
                    {/*                </h4>*/}
                    {/*            </Col>*/}
                    {/*        </Row>*/}
                    {/*    </Container>*/}
                    {/*    <Container className="align-items-center">*/}
                    {/*        <Row>*/}
                    {/*            <Col lg="6" md="6">*/}
                    {/*                <Row>*/}
                    {/*                    <Col>*/}
                    {/*                        <h1>Producer: {this.state.blockProducer}</h1>*/}
                    {/*                        <h1>Version: {this.state.version}</h1>*/}
                    {/*                        <h1>Height: {this.state.blockHeight}</h1>*/}
                    {/*                    </Col>*/}
                    {/*                </Row>*/}
                    {/*            </Col>*/}
                    {/*            <Col className="ml-auto mr-auto" lg="4" md="6">*/}
                    {/*                <Card className="card-coin card-plain">*/}
                    {/*                    <CardHeader>*/}
                    {/*                        <img alt="..." className="img-center img-fluid rounded-circle" src={require("assets/img/mike.jpg")}/>*/}
                    {/*                        <h4 className="title">Block Info</h4>*/}
                    {/*                        <p class="text-muted">{dtFormat.format(this.state.timestamp)}</p>*/}
                    {/*                    </CardHeader>*/}
                    {/*                    <CardBody>*/}
                    {/*                        <Nav className="nav-tabs-primary justify-content-center"></Nav>*/}
                    {/*                        <TabContent className="tab-subcategories" activeTab={"tab" + this.state.tabs}>*/}
                    {/*                            <TabPane tabId="tab1">*/}
                    {/*                                <div><h4 className="title">Number of Transactions: {this.state.numberOfTransactions}</h4></div>*/}
                    {/*                                <div><h4 className="title">CWP: {this.state.currentWorldPopulation}</h4></div>*/}
                    {/*                                <div><h4 className="title">New Registered People: {this.state.newRegisteredPeople}</h4></div>*/}
                    {/*                                <div><h4 className="title">TCP: {this.state.totalCommunityPeople}</h4></div>*/}
                    {/*                                <div><h4 className="title">Distribute per Person:{this.state.distributePerPerson}</h4></div>*/}
                    {/*                                <div><h4 className="title">World Wallet Amount: {this.state.worldWalletAmount}</h4></div>*/}
                    {/*                                <div><h4 className="title">Size: {this.state.size}</h4></div>*/}
                    {/*                                <div><h4 className="title">Merkle Root: {this.state.merkleRoot}</h4></div>*/}
                    {/*                            </TabPane>*/}
                    {/*                        </TabContent>*/}
                    {/*                    </CardBody>*/}
                    {/*                </Card>*/}
                    {/*            </Col>*/}
                    {/*        </Row>*/}
                    {/*    </Container>*/}
                    {/*    <Container>*/}
                    {/*        <Row>*/}
                    {/*            <Col lg="8" md="8">*/}
                    {/*            </Col>*/}
                    {/*            <Col lg="3" md="3">*/}
                    {/*            <Pagination>*/}
                    {/*                <PaginationItem>*/}
                    {/*                    <PaginationLink href={`../block/${this.state.previousBlock}`}>*/}
                    {/*                        Previous*/}
                    {/*                    </PaginationLink>*/}
                    {/*                </PaginationItem>*/}
                    {/*                <PaginationItem>*/}
                    {/*                    <PaginationLink>*/}
                    {/*                        <p class="text-muted">Blocks</p>*/}
                    {/*                    </PaginationLink>*/}
                    {/*                </PaginationItem>*/}

                    {/*                <PaginationItem>*/}
                    {/*                    <PaginationLink href={`../block/${this.state.nextBlock}`}>*/}
                    {/*                        Next*/}
                    {/*                    </PaginationLink>*/}
                    {/*                </PaginationItem>*/}
                    {/*            </Pagination>*/}
                    {/*            </Col>*/}
                    {/*        </Row>*/}
                    {/*    </Container>*/}
                    {/*</div>*/}


                    <h2>Block Info</h2>
                    <div>
                        <table>
                            <tbody>

                            <tr><td className="tdLabel">Block Hash: </td><td>{this.state.blockHash}</td></tr>
                            <tr><td className="tdLabel">Block Height: </td><td>{this.state.blockHeight}</td></tr>
                            <tr><td className="tdLabel">Date: </td><td>{dtFormat.format(this.state.timestamp)}</td></tr>
                            <tr><td className="tdLabel">CWP: </td><td>{this.state.currentWorldPopulation}</td></tr>
                            <tr><td className="tdLabel">Size: </td><td>{this.state.size}</td></tr>
                            <tr><td className="tdLabel">New Registered People: </td><td>{this.state.newRegisteredPeople}</td></tr>
                            <tr><td className="tdLabel">Previous Block: </td><td><Link to={`../block/${this.state.previousBlock}`}>{this.state.previousBlock}</Link></td></tr>
                            <tr><td className="tdLabel">Merkle Root: </td><td>{this.state.merkleRoot}</td></tr>
                            <tr><td className="tdLabel">Block Producer: </td><td>{this.state.creator}</td></tr>
                            <tr><td className="tdLabel">Version: </td><td>{this.state.version}</td></tr>
                            <tr><td className="tdLabel">TCP: </td><td>{this.state.totalCommunityPeople}</td></tr>
                            <tr><td className="tdLabel">World Wallet Amount: </td><td>{this.state.worldWalletAmount}</td></tr>
                            <tr><td className="tdLabel">Distribute per Person: </td><td>{this.state.distributePerPerson}</td></tr>
                            <tr><td className="tdLabel">Size: </td><td>{this.state.size}</td></tr>
                            <tr><td className="tdLabel">Next Block: </td><td><Link to={`../block/${this.state.nextBlock}`}>{this.state.nextBlock}</Link></td></tr>
                            <tr><td className="tdLabel">Number of Transactions: </td><td>{this.state.numberOfTransactions}</td></tr>

                            </tbody>
                        </table>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Block transactions</h3>
                    <div className="table-header btn btn-twitter ">
                        <Row>
                            <Col sm> <span>Transaction Type</span></Col>
                            <Col sm><span>Transaction ID</span></Col>
                        </Row>
                    </div>
                    {this.state.transactionBlockActivityList}

                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <div><span className="title">Block Hash: {this.state.blockHash}</span></div>*/}
                    {/*        <div><span className="title">Block Height: {this.state.blockHeight}</span></div>*/}
                    {/*        <div><span className="title">Date: {dtFormat.format(this.state.timestamp)}</span></div>*/}
                    {/*        <div><span className="title">CWP: {this.state.currentWorldPopulation}</span></div>*/}
                    {/*        <div><span className="title">Size: {this.state.size}</span></div>*/}
                    {/*        <div><span className="title">New Registered People: {this.state.newRegisteredPeople}</span></div>*/}
                    {/*        <div><span className="title">Previous Block: <Link to={`../block/${this.state.previousBlock}`}>{this.state.previousBlock}</Link></span></div>*/}
                    {/*        <div><span className="title">Merkle Root: {this.state.merkleRoot}</span></div>*/}
                    {/*        <div><span className="title">Block Producer: {this.state.blockProducer}</span></div>*/}
                    {/*        <div><span className="title">Version:{this.state.version}</span></div>*/}
                    {/*        <div><span className="title">TCP: {this.state.totalCommunityPeople}</span></div>*/}
                    {/*        <div><span className="title">World Wallet Amount: {this.state.worldWalletAmount}</span></div>*/}
                    {/*        <div><span className="title">Distribute per Person:{this.state.distributePerPerson}</span></div>*/}
                    {/*        <div><span className="title">Size: {this.state.size}</span></div>*/}
                    {/*        <div><span className="title">Next Block: <Link to={`../block/${this.state.nextBlock}`}>{this.state.nextBlock}</Link></span></div>*/}
                    {/*        <div><span className="title">Number of Transactions: {this.state.numberOfTransactions}</span></div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}


                </div>
            </div>
        );
    }
}
export default Block;