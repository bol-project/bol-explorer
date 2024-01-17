import React from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class TotalActivity extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <Table>
        <Thead>
          <Tr>
            <Th className="custom-header">
            <h3>Total Bol Days</h3>
            </Th>
            <Th className="custom-header">
            <h3>Total Blocks</h3>
            </Th>
          </Tr>
        </Thead>
          <Tbody>
            <Tr>
              <Td>
              <h2>{this.props.item?.totalDays}</h2>
              <Link to="/boldays/1">
                  <Button color="twitter">See all days</Button>
                </Link> 
              </Td>
              <Td>
                <h2>{this.props.item?.totalBlocks}</h2>
                <Link to="/blocks/1">
                  <Button color="twitter">See all blocks</Button>
                </Link>
              </Td>
            </Tr>           
          </Tbody>
        </Table>
      </div>
    );
  }
}

export default TotalActivity;
