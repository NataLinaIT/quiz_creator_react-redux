import React, { Component } from "react";
import { logout } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    console.log("Logout mount")
    this.props.logout();
  }
  render() {
    return <Redirect to={"/"} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(null, mapDispatchToProps)(Logout);
