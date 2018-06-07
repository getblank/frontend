import React, { Component } from "react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import history from "services/browserHistory";
import PropTypes from "prop-types";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

import Nav from "containers/nav";
import LoginForm from "containers/LoginForm";
import { getConfig } from "actions";
import { signIn } from "actions/auth";
import configProcessor from "services/configProcessor";

initializeIcons();

class CONFIG extends Component {
    render() {
        return <div> Config Store ({JSON.stringify(this.props.match)})</div>;
    }
}

CONFIG.propTypes = {
    match: PropTypes.object,
};

class NotFound extends Component {
    render() {
        return <div>NotFound</div>;
    }
}

class App extends Component {
    componentDidMount() {
        this.props.getConfig();
    }

    render() {
        const { config } = this.props;
        if (!config || config.fetching || !config.config) {
            return (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <Spinner size={SpinnerSize.large} />
                </div>
            );
        }

        const { signedIn } = this.props.auth;

        const signInProps = configProcessor.getSignInProps(config.config);

        return (
            <div>
                {signedIn ? (
                    <div>
                        <Nav config={config} />
                        <ConnectedRouter history={history}>
                            <Switch>
                                <Route exact path="/" component={() => <div>Root</div>} />
                                <Route path="/config/" component={CONFIG} />
                                <Route path="*" component={NotFound} />
                            </Switch>
                        </ConnectedRouter>
                    </div>
                ) : (
                    <LoginForm props={signInProps} config={config} />
                )}
            </div>
        );
    }
}

App.propTypes = {
    getConfig: PropTypes.func,
    config: PropTypes.object,
    auth: PropTypes.object,
    signedIn: PropTypes.bool,
};

// function to convert the global state obtained from redux to local props
function mapStateToProps(state) {
    return {
        config: state.config,
        auth: state.auth,
    };
}

const actions = dispatch => {
    return bindActionCreators(
        {
            getConfig,
            signIn,
        },
        dispatch,
    );
};

// wrapping the component within the connect HOC and calling the default function directly
export default connect(
    mapStateToProps,
    actions,
)(App);
