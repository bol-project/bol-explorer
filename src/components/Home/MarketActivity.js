import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class MarketActivity extends React.Component {
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
            <h3>Total Individual Accounts</h3>
            </Th>
            <Th className="custom-header">
            <h3>Total Entity Accounts</h3>
            </Th>
            <Th className="custom-header">
            <h3>Certifiers</h3>
            </Th>
            <Th className="custom-header">
            <h3>Circulating Supply</h3>
            </Th>
          </Tr>
        </Thead>
          <Tbody>
            <Tr>
              <Td>
              <h3>{this.props.item?.totalIndividuals}</h3>
              </Td>
              <Td>
              <h3>{this.props.item?.totalEntities}</h3>
              </Td>
              <Td>
              <h3>{this.props.item?.certifiers}</h3>
              </Td>
              <Td>
              <h3>{this.props.item?.circulatingSupply}</h3>
              </Td>
            </Tr>           
          </Tbody>
        </Table>
      </div>
    );
  }
}

export default MarketActivity;
