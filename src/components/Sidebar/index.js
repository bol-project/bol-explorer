import { slide as Menu } from 'react-burger-menu'

class Sidebar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    var isMenuOpen = function(state) {
        return state.isOpen;
      };

    return (
        <div id="outer-container">
            <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } onStateChange={ isMenuOpen } />
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
        </div>
        );
    }
}