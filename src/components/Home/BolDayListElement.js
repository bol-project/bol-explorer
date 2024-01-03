import React from "react";
import { Link } from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

class BolDayListElement extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="list-element">
        <Row>
          <Col sm>
            <Link to={"/bolday/" + this.props.item.index}>
              <span>{this.props.item.index}</span>
            </Link>
          </Col>
          <Col sm>
            <Link to={"/block/" + this.props.item.block}>
              <span>{this.props.item.block}</span>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BolDayListElement;
