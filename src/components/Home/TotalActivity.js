import React from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";

class TotalActivity extends React.Component {
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
                <h3>Total Bol Days</h3>
                <h2>{this.props.item?.totalDays}</h2>
                <Link to="/boldays/1">
                  <Button color="twitter">See all days</Button>
                </Link>
              </th>
              <th>
                <h3>Total Blocks</h3>
                <h2>{this.props.item?.totalBlocks}</h2>
                <Link to="/blocks/1">
                  <Button color="twitter">See all blocks</Button>
                </Link>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TotalActivity;
