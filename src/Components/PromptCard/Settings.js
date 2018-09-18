import React, { Component } from "react";
import Icon from "../Icon";

class Settings extends Component {
  state = {
    isOpen: false
  };

  handleOpenSettings = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    return (
      <div className="prompt__card-settings" onClick={this.handleOpenSettings}>
        <Icon iconName="ellipsis-v" />
      </div>
    );
  }
}

export default Settings;
