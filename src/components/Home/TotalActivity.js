import React from "react";
import {Link} from "react-router-dom";

class TotalActivity extends React.Component {

    constructor(){
        super();

        this.state = {};
    }


    render() {

        return (
            <div>
                <table align="center">
                    <tbody>
                        <tr>
                            <th>
                                <p>Total Transactions</p>
                                <p>{this.props.totalTransactions}</p>
                                <Link to="/transactions/1">See all transactions</Link>
                            </th>
                            <th>
                                <p>Last Block</p>
                                <p>{this.props.totalBlocks}</p>
                                <Link to="/blocks/1">See all blocks</Link>
                            </th>
                            <th>
                                <p>Wallet Addresses Created</p>
                                <p>{this.props.totalWalletAddresses}</p>
                                <Link to="/addresses/1">See all addresses</Link>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default TotalActivity