import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';

class Transaction extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        var currentTransaction = {type: 'Invocation', transactionID: '50b9ccaef0f9306eba1b34fbd9a66aa1365dbf8b9b9085e206310eff458db370', timestamp: 1551338586,
            sentFrom: "AXAENApG4sPqmYzce9CKbbZRWWhSAAt681", sentTo: "AbArunq3PGYmQv4xhduTKva7r2ppUqeaDi", blockHeight: '62d945ac404d2aade4a3ddfb002293aac435b16f9e31d90f1a216f7f6f90e7b4',
            networkFee: 0.001, systemFee: 0.001, size: 223, invocationScript: "408cec04e2babfet9b441721105a903c1975110f5cf1d62b4fa37763a66932615059510aeaa50c8b6f85305c4e9e0f53b07291c0dafe6c9f6265e44c593f4bf3f7" ,
            verificationScript: "21036d1402fb22ffjjtt5567dbf7fccc10d64d31c37d53c6c0ec5d62c2bdb0fce600ac"}

        var timestamp = new Date(currentTransaction.timestamp).toLocaleString();

        return (
            <div className="view-page">
                <h2>Transaction Information</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">Type: </td><td>{currentTransaction.type}</td></tr>
                        <tr><td className="tdLabel">Transaction Id: </td><td>{currentTransaction.transactionID}</td></tr>
                        <tr><td className="tdLabel">Sent From: </td><td>{currentTransaction.sentFrom}</td></tr>
                        <tr><td className="tdLabel">Sent to: </td><td>{currentTransaction.sentTo}</td></tr>
                        <tr><td className="tdLabel">Included in block: </td><td><Link to={`../block/${currentTransaction.blockHeight}`}>{currentTransaction.blockHeight}</Link></td></tr>
                        <tr><td className="tdLabel">Completed On: </td><td>{timestamp}</td></tr>
                        <tr><td className="tdLabel">Network Fee: </td><td>{currentTransaction.networkFee}</td></tr>
                        <tr><td className="tdLabel">System Fee: </td><td>{currentTransaction.systemFee}</td></tr>
                        <tr><td className="tdLabel">Size (bytes): </td><td>{currentTransaction.size}</td></tr>
                        <tr><td className="tdLabel">Invocation script: </td><td>{currentTransaction.invocationScript}</td></tr>
                        <tr><td className="tdLabel">Verification script: </td><td>{currentTransaction.verificationScript}</td></tr>


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Transaction;