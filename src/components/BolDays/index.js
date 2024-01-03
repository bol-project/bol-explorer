import React, { Component } from "react";
import { Link } from "react-router-dom";
import BolContext from "../../bolContext";

import "./style.css";
import BolDayListElement from "../Home/BolDayListElement";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

class BolDays extends Component {

  render() {
    let page = Number(this.props?.match?.params?.page ?? 1);

    return (
      <div className="view-page">
        <h1>Latest Bol Days</h1>

        <BolDaysTable page={page} />
        <br />
        <br />
        <Link
          className={page > 1 ? "" : "invisible"}
          to={`/boldays/${page - 1}`}
        >
          Previous
        </Link>
        <span> </span>
        <Link to={`/boldays/${page + 1}`}>Next</Link>
      </div>
    );
  }
}

class BolDaysTable extends Component {
  static contextType = BolContext;

  constructor() {
    super();
    this.state = { bolDays: [] };
  }

  async componentDidUpdate(nextProps) {
    if (this.props?.page === nextProps?.page) {
      return;
    }

    await this.fetchBolDays();
  }

  async componentDidMount() {
    await this.fetchBolDays();
  }

  async fetchBolDays() {
    let page = Number(this.props.page ?? 1);
    const pageSize = this.props.pageSize ?? 10;

    const client = this.context;
    const height = Number(await client.getBlockHeight());
    const claimInterval = Number(await client.getClaimInterval());
    const intervals = Math.floor(height / claimInterval);

    const totalPages = Math.ceil(intervals / pageSize);
    page = totalPages - page + 1;

    let startRow = Math.min(pageSize * page, intervals);
    let endRow = Math.max(startRow - pageSize, -1);

    const bolDays = [];
    for (let i = startRow; i > endRow; i--) {
      const block = claimInterval * i;
      bolDays.push({ index: i, block });
    }

    this.setState({ bolDays });
  }

  render() {
    return (
      <>
        <div className="table-header btn btn-twitter">
          <Row>
            <Col sm>
              <span>Bol day</span>
            </Col>
            <Col sm>
              <span>Block Height</span>
            </Col>
          </Row>
        </div>
        <div className="table-list">
          {this.state.bolDays.map((day) => (
            <BolDayListElement key={day.index} item={day} />
          ))}
        </div>
      </>
    );
  }
}

export { BolDays, BolDaysTable };
