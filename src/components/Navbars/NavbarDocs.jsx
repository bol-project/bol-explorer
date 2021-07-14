import React from "react";

// reactstrap components
import {
    Collapse,
    UncontrolledCollapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    FormGroup,
    Form,
    Input,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container, CardHeader
} from "reactstrap";
import InputGroupAddon from "reactstrap/es/InputGroupAddon";
import InputGroupText from "reactstrap/es/InputGroupText";
import CardBody from "reactstrap/es/CardBody";
import Card from "reactstrap/es/Card";
import InputGroup from "reactstrap/es/InputGroup";

class NavbarDocs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "navbar-transparent"
        };
    }
    componentDidMount() {
        this.setState({
            color: "bg-dark"
        });
        //window.addEventListener("scroll", this.changeColor);
    };
    componentWillUnmount() {
        this.setState({
            color: "bg-dark"
        });
        //window.removeEventListener("scroll", this.changeColor);
    };
    changeColor = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            this.setState({
                color: "bg-dark"
            });
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            this.setState({
                color: "bg-dark"        //"navbar-transparent"
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

    render() {
        return (
            <>
                <Navbar className={"fixed-top " + this.state.color} color-on-scroll="100" expand="lg">
                    <Container>
                        <div className="navbar-translate">
                            <NavbarBrand href="/">
                                <img
                                    alt="..." width={50} height={50} src={require("assets/img/bol_logo.png")}
                                />
                            </NavbarBrand>
                            <button
                                aria-expanded={false}
                                aria-label="Toggle navigation"
                                className="navbar-toggler"
                                data-toggle="collapse"
                                type="button"
                            >
                                <span className="navbar-toggler-icon" />
                                <span className="navbar-toggler-icon" />
                                <span className="navbar-toggler-icon" />
                            </button>
                        </div>
                        <Collapse isOpen={false} navbar toggler="#">
                            <Nav navbar>
                                <NavItem className="active">
                                    <NavLink href="/blocks/1">
                                        Blocks
                                    </NavLink>
                                </NavItem>
                                <NavItem className="active">
                                    <NavLink href="/transactions/1">
                                        Transactions
                                    </NavLink>
                                </NavItem>
                                <NavItem className="active">
                                    <NavLink href="/WPD/1">
                                        CWP
                                    </NavLink>
                                </NavItem>
                                <NavItem className="active">
                                    <NavLink href="/TCP/1">
                                        TCP
                                    </NavLink>
                                </NavItem>
                                <NavItem className="active">
                                    <NavLink href="/accounts/1">
                                        Total Accounts
                                    </NavLink>
                                </NavItem>
                                <NavItem className="active">
                                    <NavLink href="/boldays/1">
                                        BOL DAY
                               </NavLink>
                                </NavItem>
                            </Nav>
                            <Form className="form-inline">
                                <FormGroup className="no-border">
                                            <InputGroup className={this.state.focused}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-zoom-split" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className={'search-field'}
                                                    type="text"
                                                    placeholder="Search"
                                                />
                                            </InputGroup>
                                </FormGroup>
                            </Form>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default NavbarDocs;