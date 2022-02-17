import { Component } from "react";
class NavigationPannel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavigationPanel">
        <Login></Login>
        <Logout></Logout>
      </nav>
    );
  }
}
