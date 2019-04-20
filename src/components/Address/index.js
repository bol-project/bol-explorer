import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';

class Address extends Component {

    constructor() {
        super();

        this.state = {
        };
    }

    render() {

        console.log("aaaaaa"  );

        var currentAddress = {addressId: 'AV8uSHreU4FZMD3CLSBBYj92w4q5Kg7q3Z', created: 1551338586, transactions: 12,
            lastTransaction: '1212212052676845b59d15993059e098c0c10c7742bfb93292cb469a70ebb04d', tokens: 4};

         var created = new Date(currentAddress.created).toLocaleString();

        return (
            <div >
                <h2>Address Information</h2>
                <div>
                    <table>
                        <tbody>

                        <tr><td className="tdLabel">Address Id: </td><td>{currentAddress.addressId}</td></tr>
                        <tr><td className="tdLabel">Created: </td><td>{created}</td></tr>
                        <tr><td className="tdLabel">Transactions: </td><td>{currentAddress.transactions}</td></tr>
                        <tr><td className="tdLabel">Last transaction: </td><td>{currentAddress.lastTransaction}</td></tr>
                        <tr><td className="tdLabel">Tokens: </td><td>{currentAddress.tokens}</td></tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Address;