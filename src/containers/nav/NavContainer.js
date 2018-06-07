import React, { Component } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

import Nav from "components/nav";
import { getConfig } from "actions";

class NavContainer extends Component {
    onItemClick = name => {
        const url = `/${name}`;
        this.props.navigateTo(url);
    };

    render() {
        let { config } = this.props;
        if (!config || config.fetching || !config.config) {
            return <Spinner size={SpinnerSize.large} />;
        }

        const { nav, appTitle } = config;
        const items = [
            {
                key: "appTitle",
                name: appTitle,
                disabled: true,
            },
            ...nav.map(e => ({ key: e.key, name: e.label, linkHref: e.href })),
        ];
        return <Nav items={items} onClick={this.onItemClick} />;
    }
}

NavContainer.propTypes = {
    getConfig: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    config: PropTypes.object,
    nav: PropTypes.object,
};

const actions = dispatch => {
    return bindActionCreators(
        {
            navigateTo: push,
            getConfig,
        },
        dispatch,
    );
};

function mapStateToProps(state) {
    return {
        config: state.config,
    };
}

export default connect(mapStateToProps, actions)(NavContainer);
