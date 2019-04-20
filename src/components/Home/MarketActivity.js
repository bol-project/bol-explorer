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
                                <p>NEO</p>
                                <p>{this.props.neoCoinPrice}</p>
                            </th>
                            <th>
                                <p>Current market cap</p>
                                <p>{this.props.currentMarketCap}</p>
                            </th>
                            <th>
                                <p>24 hour changed</p>
                                <p>{this.props.last24HourChange}</p>
                            </th>
                            <th>
                                <p>24 hour volume</p>
                                <p>{this.props.last24HourVolume}</p>
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