import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './style.css';
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import TransactionBlockListElement from "../Home/TransactionBlockListElement";
import JsonRpcClient from "react-jsonrpc-client";

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

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL
});

class Block extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this._isMounted = true;

        this.getBlock();
        setInterval(() => {
            this.getBlock();
        }, 5000);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    getBlock() {

        api.request('getblock', this.props.match.params.blockHash, 1).then((response) => {

            if (response && this._isMounted) {
                this.setState({
                    blockHash: response.hash,
                    blockHeight: response.index,
                    time: response.time,
                    creator: response.creator,
                    size: response.size,
                    version: response.version,
                    numberOfTransactions: (response.tx && response.tx.length) ? response.tx.length : 0,
                    transactionBlockActivityList: response.tx.map(item => <TransactionBlockListElement key={item.txid}
                                                                                                       item={item}/>),
                    merkleRoot: response.merkleroot,
                    previousBlockHash: response.previousblockhash,
                    nextBlockHash: response.nextblockhash,
                    currentWorldPopulation: response.currentWorldPopulation,
                    newRegisteredPeople: response.newRegisteredPeople,
                    totalCommunityPeople: response.totalCommunityPeople,
                    worldWalletAmount: response.worldWalletAmount,
                    distributePerPerson: response.distributePerPerson
                });
            }

        });
    }

    render() {

        var dtFormat = Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return (
            <div className="view-page">
                <div className="Block">
                    <h2>Block Info</h2>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td className="tdLabel">Block Hash:</td>
                                <td>{this.state.blockHash}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Block Height:</td>
                                <td>{this.state.blockHeight}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Date:</td>
                                <td>{dtFormat.format(this.state.time)}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">CWP:</td>
                                <td>{this.state.currentWorldPopulation}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Size:</td>
                                <td>{this.state.size}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">New Registered People:</td>
                                <td>{this.state.newRegisteredPeople}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Previous Block:</td>
                                <td><Link to={`../block/${this.state.previousBlockHash}`}
                                          onClick={this.forceUpdate}>{this.state.previousBlockHash}</Link></td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Merkle Root:</td>
                                <td>{this.state.merkleRoot}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Block Producer:</td>
                                <td>{this.state.creator}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Version:</td>
                                <td>{this.state.version}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">TCP:</td>
                                <td>{this.state.totalCommunityPeople}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">World Wallet Amount:</td>
                                <td>{this.state.worldWalletAmount}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Distribute per Person:</td>
                                <td>{this.state.distributePerPerson}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Next Block:</td>
                                <td><Link to={`../block/${this.state.nextBlockHash}`}>{this.state.nextBlockHash}</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Number of Transactions:</td>
                                <td>{this.state.numberOfTransactions}</td>
                            </tr>

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

                </div>
            </div>
        );
    }
}

export default Block;