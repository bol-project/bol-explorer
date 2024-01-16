import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Form, Input, InputGroup, Button } from "reactstrap";
import BolContext from "../../bolContext";

import "./style.css";
import BlockListElement from "../Home/BlockListElement";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

var pageSize = 10;

class Blocks extends Component {
  static contextType = BolContext;

  constructor() {
    super();

    this.searchValueChanged = this.searchValueChanged.bind(this);
    this.navigateToBlock = this.navigateToBlock.bind(this);

    this.state = {
      blocks: [],
      searchValue: "",
    };
  }

  searchValueChanged(event) {
    this.setState({ searchValue: event.target.value });
  }

  navigateToBlock(event) {
    event.preventDefault();
    this.props.history.push("/block/" + this.state.searchValue);
  }

  async componentDidUpdate(nextProps) {
    if (this.props.match.params.page === nextProps.match.params.page) {
      return;
    }
    this.setState({ blocks: [] });
    await this.fetchBlocks();
  }

  async componentDidMount() {
    if (this.props.match.params.page <= 0) {
      return;
    }

    await this.fetchBlocks();
  }

  async fetchBlocks() {
    const client = this.context;
    const height = Number(await client.getBlockHeight()) - 1;
    let page = Number(this.props.match?.params?.page ?? "0");

    const totalPages = Math.ceil(height / pageSize);
    page = totalPages - page + 1;

    let startRow = Math.min(pageSize * page, height);
    let endRow = Math.max(startRow - pageSize, -1);

    const blocks = [];
    for (let i = startRow; i > endRow; i--) {
      const block = await client.getBlock(i);
      blocks.push(block);
    }

    this.setState({ blocks });
  }

  render() {
    return (
      <div className="view-page">
        <Form className="form-inline" onSubmit={this.navigateToBlock}>
          <FormGroup style={{ width: "100%" }} className="no-border">
            <InputGroup>
              <Input
                className={"search-field"}
                style={{ width: "100%" }}
                type="text"
                placeholder="Enter Block Height or Hash"
                value={this.state.searchValue}
                onChange={this.searchValueChanged}
              />
            </InputGroup>
            <Button type="submit">Search</Button>
          </FormGroup>
        </Form>
        <br />
        <h1>Latest blocks</h1>

        <div className="table-list">
          <Table>
            <Thead>
              <Tr>
                <Th className="custom-header">Height</Th>
                <Th className="custom-header">Size</Th>
                <Th className="custom-header">Transactions</Th>
                <Th className="custom-header">Producer</Th>
                <Th className="custom-header">Timestamp</Th>
              </Tr>
            </Thead>
            <Tbody>
            {this.state.blocks.map((block) => (
            <BlockListElement key={block.hash} item={block} />
          ))}
            </Tbody>
          </Table>
        </div>

        <br />
        <br />
        <Link
          className={
            parseInt(this.props.match.params.page) > 1 ? "" : "invisible"
          }
          to={`/blocks/${parseInt(this.props.match.params.page) - 1}`}
        >
          Previous
        </Link>
        <span> </span>
        <Link to={`/blocks/${parseInt(this.props.match.params.page) + 1}`}>
          Next
        </Link>
      </div>
    );
  }
}

export default Blocks;
