import React, { Component } from 'react';

import './style.css';
import JsonRpcClient from "react-jsonrpc-client";

var api = new JsonRpcClient({
    endpoint: process.env.REACT_APP_SERVER_URL
});
class Transaction extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
        };
    }

    componentWillMount() {
        this._isMounted = true;

        this.getTransaction();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    getTransaction() {

        api.request('getrawtransaction', this.props.match.params.transactionHash, 1).then((response) => {

            if (response && this._isMounted) {
                this.setState({
                    txid: response.txid,
                    type: response.type,
                    version: response.version,
                    size: response.size,
                    blockhash: response.blockhash,
                    parts: response.parts,
                    previousTransaction: response.previousTransaction,
                    previousIndex: response.previousIndex,
                    net_fee: response.net_fee,
                    invocationScript: response.invocationScript,
                    verificationScript: response.verificationScript
                });

                this.getBlock();
            }
        });
    }

    getBlock() {

        api.request('getblock', this.state.blockhash, 1).then((response) => {

            if (response && this._isMounted) {
                this.setState({
                    blockIndex: response.index
                });
            }
        });
    }

    render() {

        // var currentTransaction = {type: 'Invocation', transactionID: '50b9ccaef0f9306eba1b34fbd9a66aa1365dbf8b9b9085e206310eff458db370', timestamp: 1551338586,
        //     sentFrom: "AXAENApG4sPqmYzce9CKbbZRWWhSAAt681", sentTo: "AbArunq3PGYmQv4xhduTKva7r2ppUqeaDi", blockHeight: '62d945ac404d2aade4a3ddfb002293aac435b16f9e31d90f1a216f7f6f90e7b4',
        //     networkFee: 0.001, systemFee: 0.001, size: 223, invocationScript: "408cec04e2babfet9b441721105a903c1975110f5cf1d62b4fa37763a66932615059510aeaa50c8b6f85305c4e9e0f53b07291c0dafe6c9f6265e44c593f4bf3f7" ,
        //     verificationScript: "21036d1402fb22ffjjtt5567dbf7fccc10d64d31c37d53c6c0ec5d62c2bdb0fce600ac"}
        //
        // var timestamp = new Date(currentTransaction.timestamp).toLocaleString();

        return (
            <div className="view-page">
                <h2>Transaction Information</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">Transaction Id: </td><td>{this.state.txid}</td></tr>
                        <tr><td className="tdLabel">Type: </td><td>{this.state.type}</td></tr>
                        <tr><td className="tdLabel">Version: </td><td>{this.state.version}</td></tr>
                        <tr><td className="tdLabel">Size: </td><td>{this.state.size}</td></tr>
                        <tr><td className="tdLabel">Block Index: </td><td>{this.state.blockIndex}</td></tr>
                        <tr><td className="tdLabel">Parts: </td><td>{this.state.parts}</td></tr>
                        <tr><td className="tdLabel">Previous Transaction: </td><td>{this.state.previousTransaction}</td></tr>
                        <tr><td className="tdLabel">Previous Index: </td><td>{this.state.previousIndex}</td></tr>
                        <tr><td className="tdLabel">Network Fee: </td><td>{this.state.net_fee}</td></tr>
                        <tr><td className="tdLabel">Invocation script: </td><td>{this.state.invocationScript}</td></tr>
                        <tr><td className="tdLabel">Verification script: </td><td>{this.state.verificationScript}</td></tr>

                        {/*<tr><td className="tdLabel">Sent From: </td><td>{currentTransaction.sentFrom}</td></tr>*/}
                        {/*<tr><td className="tdLabel">Sent to: </td><td>{currentTransaction.sentTo}</td></tr>*/}
                        {/*<tr><td className="tdLabel">Included in block: </td><td><Link to={`../block/${currentTransaction.blockHeight}`}>{currentTransaction.blockHeight}</Link></td></tr>*/}
                        {/*<tr><td className="tdLabel">Completed On: </td><td>{timestamp}</td></tr>*/}

                        {/*<tr><td className="tdLabel">System Fee: </td><td>{currentTransaction.systemFee}</td></tr>*/}
                        {/*<tr><td className="tdLabel">Size (bytes): </td><td>{currentTransaction.size}</td></tr>*/}



                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Transaction;