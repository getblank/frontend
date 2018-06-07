import React, { Component } from "react";
import PropTypes from "prop-types";

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";

class Nav extends Component {
    render() {
        const { items } = this.props;
        items.forEach(e => (e.onClick = () => e.linkHref && this.props.onClick(e.linkHref)));
        return <CommandBar isSearchBoxVisible={false} items={items} />;
    }
}

Nav.propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.func.isRequired,
};

export default Nav;
