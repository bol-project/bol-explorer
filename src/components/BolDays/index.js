import React, { Component } from "react";
import { Link } from "react-router-dom";
import BolContext from "../../bolContext";
import "./style.css";
import BolDayListElement from "../Home/BolDayListElement";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FormGroup, Form, Input, InputGroup, Button } from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
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
        <Link className={page > 1 ? "" : "invisible"} to={`/boldays/${page - 1}`}>
        <Button color="twitter">Previous</Button>
        </Link>
        <span> </span>
        <Link to={`/boldays/${page + 1}`}><Button color="twitter">Next</Button></Link>
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
      

        <div className="table-list">
          <Table>
            <Thead>
              <Tr>
                <Th className="custom-header">Bol day</Th>
                <Th className="custom-header">Block Height</Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.state.bolDays.map((day) => (
                <BolDayListElement key={day.index} item={day} />
              ))}
            </Tbody>
          </Table>
        </div>
      
    );
  }
}

export { BolDays, BolDaysTable };