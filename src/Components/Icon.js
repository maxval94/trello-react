import React, { Component } from "react";
import classnames from "classnames";

class Icon extends Component {
  static defaultProps = {
    iconName: "facebook",
    onClick: () => {}
  };

  render() {
    const { className: _className, iconName, onClick } = this.props;
    const className = classnames("icon", "fa", _className, `fa-${iconName}`);

    return <i onClick={onClick} className={className} />;
  }
}

export default Icon;
