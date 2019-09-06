import React from "react";
import {Link} from "react-router-dom";

class MarketActivity extends React.Component {

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
                                <h3>NEO</h3>
                                <h2>{this.props.neoCoinPrice}</h2>
                            </th>
                            <th>
                                <h3>Current market cap</h3>
                                <h2>{this.props.currentMarketCap}</h2>
                            </th>
                            <th>
                                <h3>24 hour changed</h3>
                                <h2>{this.props.last24HourChange}</h2>
                            </th>
                            <th>
                                <h3>24 hour volume</h3>
                                <h2>{this.props.last24HourVolume}</h2>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <h1>Chart goes here...</h1>
            </div>

        );
    }

}

export default MarketActivity