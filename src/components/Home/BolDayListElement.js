import React from "react";
import { Link } from "react-router-dom";
import { Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class BolDayListElement extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Tr>
        <Td className="long-word-cell">
          <Link to={"/bolday/" + this.props.item.index}>
            {this.props.item.index}
          </Link>
        </Td>
        <Td className="long-word-cell">
          <Link to={"/block/" + this.props.item.block}>
            {this.props.item.block}
          </Link>
        </Td>
      </Tr>
    );
  }
}

export default BolDayListElement;
