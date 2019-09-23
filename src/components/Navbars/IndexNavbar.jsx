import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="Designed and Coded by Creative Tim"
              tag={Link}
            >
              <span>BLK• </span>
              Design System React
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    BLK•React
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
                {/*<NavItem className="active">*/}
                    {/*<NavLink  onClick={e => e.preventDefault()} >*/}
                        {/*<Link to="/">*/}
                            {/*<p>Explorer</p>*/}
                        {/*</Link>*/}
                    {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem className="active">*/}
                    {/*<NavLink onClick={e => e.preventDefault()} >*/}
                        {/*<Link to="/blocks/1">*/}
                            {/*<p>Blocks</p>*/}
                        {/*</Link>*/}
                    {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem className="active">*/}
                    {/*<NavLink onClick={e => e.preventDefault()} >*/}
                        {/*<Link to="/transactions/1">*/}
                            {/*<p>Transactions</p>*/}
                        {/*</Link>*/}
                    {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem className="active">*/}
                    {/*<NavLink  onClick={e => e.preventDefault()} >*/}
                        {/*<Link to="/worldPopulationDays/1">*/}
                            {/*<p>Current World Population</p>*/}
                        {/*</Link>*/}
                    {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem className="active">*/}
                    {/*<NavLink  onClick={e => e.preventDefault()} >*/}
                        {/*<Link to="/totalCommunityDays/1">*/}
                            {/*<p>Total Community People</p>*/}
                        {/*</Link>*/}
                    {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem className="active">*/}
                    {/*<NavLink  onClick={e => e.preventDefault()} >*/}
                        {/*<Link to="/accounts/1">*/}
                            {/*<p>Total Accounts</p>*/}
                        {/*</Link>*/}
                    {/*</NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavItem className="active">*/}
                    {/*<NavLink  onClick={e => e.preventDefault()} >*/}
                        {/*<Link to="/distributions/1">*/}
                            {/*<p>Last Day Distribute Per Person</p>*/}
                        {/*</Link>*/}
                    {/*</NavLink>*/}
                {/*</NavItem>*/}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default ComponentsNavbar;
