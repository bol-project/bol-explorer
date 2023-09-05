import React from "react";
import {Link} from "react-router-dom";
import Button from "reactstrap/lib/Button";

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
                                <h3>Total Transactions</h3>
                                <h2>{this.props.totalTransactions}</h2>
                                <Link to="/transactions/1">
                                    <Button color="twitter">See all transactions</Button>
                                </Link>
                            </th>
                            <th>
                                <h3>Last Block</h3>
                                <h2>{this.props.totalBlocks}</h2>
                                <Link to="/blocks/1">
                                    <Button color="twitter">See all blocks</Button>
                                </Link>
                            </th>
                            <th>
                                <h3>Wallet Addresses Created</h3>
                                <h2>{this.props.totalWalletAddresses}</h2>
                                <Link to="/addresses/1">
                                    <Button color="twitter">See all addresses</Button>
                                </Link>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default TotalActivity