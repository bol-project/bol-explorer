import { scaleRotate as Menu, CustomIcon} from 'react-burger-menu'
import React, { Component } from 'react';
//import Menu from 'react-burger-menu/lib/menus/slide' //ToDo: Change the styling


class Sidebar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        menuOpen: false
        }
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
        this.setState({menuOpen: false})
    }

    showSettings (event) {
        event.preventDefault();
        }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    render () {
        return (
        <div id="outer-container">
            <Menu 
            pageWrapId={ "page-wrap" } 
            outerContainerId={ "outer-container" }
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
            >
            <main id="page-wrap">
                <a id="accounts" className="menu-item" href="/accounts">Accounts</a>
                <a id="address" className="menu-item" href="/address">Address</a>
                <a id="app" className="menu-item" href="/app">App</a>
                <a id="blocks" className="menu-item" href="/blocks">Blocks</a>
                <a id="home" className="menu-item" href="/home">Home</a>
                <a id="totalcommunitydays" className="menu-item" href="/totalcommunitydays">Total community days</a>
                <a id="transactions" className="menu-item" href="/transactions">Transactions</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            </main>
            </Menu>
            <CustomIcon onClick={() => this.toggleMenu()} />
        </div>
        )
    }
}
export default Sidebar;