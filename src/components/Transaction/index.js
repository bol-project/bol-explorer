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

        var currentTransaction = {type: 'Invocation', transactionId: '50b9ccaef0f9306eba1b34fbd9a66aa1365dbf8b9b9085e206310eff458db370', completedOn: 1551338586,
            sentFrom: "AXAENApG4sPqmYzce9CKbbZRWWhSAAt681", sentTo: "AbArunq3PGYmQv4xhduTKva7r2ppUqeaDi", networkFee: 0.001, systemFee: 0.001, size: 223}

        var completedOn = new Date(currentTransaction.completedOn).toLocaleString();

        return (
            <div >
                <h2>Transaction Information</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">Type: </td><td>{currentTransaction.type}</td></tr>
                        <tr><td className="tdLabel">Transaction Id: </td><td>{currentTransaction.transactionId}</td></tr>
                        <tr><td className="tdLabel">Sent From: </td><td>{currentTransaction.sentFrom}</td></tr>
                        <tr><td className="tdLabel">Sent to: </td><td>{currentTransaction.sentTo}</td></tr>
                        <tr><td className="tdLabel">Completed On: </td><td>{currentTransaction.networkFee}</td></tr>
                        <tr><td className="tdLabel">Completed On: </td><td>{currentTransaction.systemFee}</td></tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Transaction;