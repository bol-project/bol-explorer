import React from "react";

class MarketActivity extends React.Component {
  constructor() {
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
                <h3>Total Individual Accounts</h3>
                <h2>{this.props.item?.totalIndividuals}</h2>
              </th>
              <th>
                <h3>Total Entity Accounts</h3>
                <h2>{this.props.item?.totalEntities}</h2>
              </th>
              <th>
                <h3>Certifiers</h3>
                <h2>{this.props.item?.certifiers}</h2>
              </th>
              <th>
                <h3>Circulating Supply</h3>
                <h2>{this.props.item?.circulatingSupply}</h2>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MarketActivity;
