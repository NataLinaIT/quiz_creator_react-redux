import React, { Component } from "react";
import "./Drawer.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

export default class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName="active"
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = ["drawer"];
    if (!this.props.isOpen) {
      cls.push("close");
    }

    const links = [{ to: "/", label: "Test list", exact: true }];
    // console.log(this.props.isAuthenticated);

    if (this.props.isAuthenticated) {
      links.push({ to: "/quiz-creator", label: "Create test", exact: false });
      links.push({ to: "/logout", label: "Logout", exact: false });
    } else {
      links.push({ to: "/auth", label: "Authorization", exact: false });
    }

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>

        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
