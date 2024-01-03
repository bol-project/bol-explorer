import React, { Component } from "react";

import { FormGroup, Form, Input, InputGroup, Button } from "reactstrap";

import "./style.css";

class Transactions extends Component {
  constructor() {
    super();
    this.searchValueChanged = this.searchValueChanged.bind(this);
    this.navigateToTransaction = this.navigateToTransaction.bind(this);
    this.state = { searchValue: "" };
  }

  searchValueChanged(event) {
    this.setState({ searchValue: event.target.value });
  }

  navigateToTransaction(event) {
    event.preventDefault();
    this.props.history.push("/transaction/" + this.state.searchValue);
  }

  render() {
    return (
      <div className="view-page">
        <Form className="form-inline" onSubmit={this.navigateToTransaction}>
          <FormGroup style={{ width: '100%' }} className="no-border">
            <InputGroup>
              <Input
                className={"search-field"}
                style={{ width: '100%' }}
                type="text"
                placeholder="Enter Transaction Hash"
                value={this.state.searchValue}
                onChange={this.searchValueChanged}
              />
            </InputGroup>
            <Button type="submit">Search</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Transactions;
