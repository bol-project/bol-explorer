import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';

class Account extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

       var currentAccount = {accountId: 'AV8uSHreU4FZMD3CLSBBYj92w4q5Kg7q3Z', edi: "edi1", mainAddress: "fdsfg56456gffrr555yuhggf",
            timestamp: 1551338586, otherAddresses: [], walletBalance: 0, totalTransactions: 0, lastTransaction: '1212212052676845b59d15993059e098c0c10c7742bfb93292cb469a70ebb04d'};

         var timestamp = new Date(currentAccount.timestamp).toLocaleString();

        return (
            <div className="view-page">
                <h2>Account Information</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">Account Id: </td><td>{currentAccount.accountId}</td></tr>
                        <tr><td className="tdLabel">EDI: </td><td>{currentAccount.edi}</td></tr>
                        <tr><td className="tdLabel">Main Address: </td><td>{currentAccount.mainAddress}</td></tr>
                        <tr><td className="tdLabel">Timestamp: </td><td>{timestamp}</td></tr>
                        <tr><td className="tdLabel">Other Addresses: </td><td>[]</td></tr>
                        <tr><td className="tdLabel">Wallet Balance: </td><td>{currentAccount.walletBalance}</td></tr>
                        <tr><td className="tdLabel">Total Transactions: </td><td>{currentAccount.totalTransactions}</td></tr>
                        <tr><td className="tdLabel">Last Transaction: </td><td>{currentAccount.lastTransaction}</td></tr>
                        <tr><td className="tdLabel">Detailed Account Info: </td><td>{currentAccount.lastTransaction}</td></tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Account;