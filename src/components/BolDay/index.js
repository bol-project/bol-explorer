import React, { Component } from 'react';

import './style.css';
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import JsonRpcClient from "react-jsonrpc-client";

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL
});
var scriptHash = "49071c33087967cc6d3c0f0ef35c013163b047eb";
var ClaimIntervalStorageKey = "B3";
var CWPStorageKey = "B7";
var TCPStorageKey = "08";
var WorldWalletAmountStorageKey = "B8";
var DistributePerPersonStorageKey = "B4";

class BolDay extends Component {

    _isMounted = false;

    constructor() {
        super();

        this.state = {};
    }

    componentWillMount() {
        this._isMounted = true;

        this.getClaimInterval().then(() => {
            this.getBlock();
        }).catch(console.log);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    getClaimInterval() {

        return api.request('getstorage', scriptHash, ClaimIntervalStorageKey).then((response) => {

            if (response && this._isMounted) {

                this.setState({claimInterval: parseInt(response, 16)});
            }
        });
    }

    getBlock() {
        return api.request('getblock', this.props.match.params.blockHash, 1).then((response) => {

            if (response && this._isMounted) {

                this.setState({
                    bolDay: parseInt(response.index / this.state.claimInterval),
                    blockHeight: response.index
                });

                this.getCWP();                                              //interval block
                this.getTCP().then(() => {
                    this.getNewRegisteredPeople();
                });
                this.getWorldWalletAmount();
                this.getDistributePerPerson();
            }
        });
    }

    getCWP() {
        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(this.state.blockHeight)));
        api.request('getstorage', scriptHash, CWPStorageKey + blockKey).then((response) => {

            if (response && this._isMounted) {

                this.setState({cwp: this.bigIntegerToInt(this.toBase10(this.reverseHex(response)), 8)})
            }
        });
    }

    getTCP() {

        return this.getTCPByBlockHeight(this.state.blockHeight).then((response) => {

            if (response && this._isMounted) {
                this.setState({tcp: this.toBase10(this.reverseHex(response))});
            }
        });
    }

    getNewRegisteredPeople() {

        this.getTCPByBlockHeight(this.state.blockHeight - this.state.claimInterval).then((response) => {

            if (response && this._isMounted) {
                this.setState({newRegisteredPeople: this.state.tcp - this.toBase10(this.reverseHex(response))});
            }
        });
    }

    getWorldWalletAmount() {

        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(this.state.blockHeight)));
        api.request('getstorage', scriptHash, WorldWalletAmountStorageKey + blockKey).then((response) => {

            if (response && this._isMounted) {
                this.setState({worldWalletAmount: this.bigIntegerToInt(this.toBase10(this.reverseHex(response)), 4)});
            }
        });
    }

    getDistributePerPerson() {

        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(this.state.blockHeight)));
        api.request('getstorage', scriptHash, DistributePerPersonStorageKey + blockKey).then((response) => {

            if (response && this._isMounted) {
                this.setState({distributePerPerson: this.bigIntegerToInt(this.toBase10(this.reverseHex(response)), 4)});
            }
        });
    }

    getTCPByBlockHeight(height) {

        let blockKey = this.reverseHex(this.addLeadingZeros(this.toBase16(height)));
        return api.request('getstorage', scriptHash, TCPStorageKey + blockKey);
    }

    toBase16(num) {
        console.log(num)
        return num.toString(16);
    }

    toBase10(str) {
        return parseInt(str, 16)
    }

    bigIntegerToInt(str, decimalPart) {
        return Math.floor(Number(str/Math.pow(10, decimalPart)));
    }

    addLeadingZeros(numStr) {
        return (numStr && numStr.length % 2 === 0) ? numStr : '0' + numStr;
    }

    reverseHex(numStr) {
        let reversedNumStr = [];
        for(var i = 0; i < numStr.length; i+=2){
            reversedNumStr.push(numStr[i] + numStr[i+1]);
        }
        return reversedNumStr.reverse().join('');
    }w

    render() {

        return (
            <div className="view-page">
                <div className="Block">
                    <h2>Bol Day</h2>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td className="tdLabel">Bol day:</td>
                                <td>{this.state.bolDay}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">CWP:</td>
                                <td>{this.state.cwp}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">New Registered People:</td>
                                <td>{this.state.newRegisteredPeople}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">TCP:</td>
                                <td>{this.state.tcp}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">World Wallet Amount:</td>
                                <td>{this.state.worldWalletAmount}</td>
                            </tr>
                            <tr>
                                <td className="tdLabel">Distribute per Person:</td>
                                <td>{this.state.distributePerPerson}</td>
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

export default BolDay;