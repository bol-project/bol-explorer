import React from "react";
import { withRouter } from "react-router-dom";

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
} from "reactstrap";

class NavbarDocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      color: "bg-dark",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <NavbarBrand href="/">
          <img
            alt="..."
            width={50}
            height={50}
            src={require("../../assets/img/bol_logo.png")}
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem className="active">
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem className="active">
              <NavLink href="/blocks/1">Blocks</NavLink>
            </NavItem>
            <NavItem className="active">
              <NavLink href="/transactions">Transactions</NavLink>
            </NavItem>
            <NavItem className="active">
              <NavLink href="/accounts">Accounts</NavLink>
            </NavItem>
            <NavItem className="active">
              <NavLink href="/boldays/1">Bol Days</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavbarDocs);
