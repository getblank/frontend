import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

import TextInput from "components/inputs/TextInput";
import I18n from "services/i18n";
import template from "services/template";
import { signIn } from "actions/auth";

class LoginForm extends Component {
    submit = () => {
        this.props.signIn({});
    };

    render() {
        const { props, config } = this.props;
        const i18n = new I18n(config.i18n);
        const tplModel = { $i18n: i18n.getForStore() };
        const inputs = Object.keys(props)
            .sort((a, b) => props[a].formOrder - props[b].formOrder)
            .map(e => {
                const prop = props[e];
                return (
                    <TextInput
                        key={e}
                        type={prop.type}
                        label={template.render(prop.label, tplModel) || prop.label}
                        display={prop.display}
                        required={prop.required}
                        onChanged={text => console.info("CHANGED", text)}
                    />
                );
            });

        const { signInRequest } = this.props.auth;
        return (
            <div>
                <Dialog
                    hidden={false}
                    onDismiss={this._closeDialog}
                    dialogContentProps={{
                        type: DialogType.largeHeader,
                        title: config.appTitle,
                        subText: i18n.get("_commonSettings.signIn.title"),
                    }}
                    modalProps={{
                        isBlocking: true,
                        containerClassName: "ms-dialogMainOverride",
                    }}
                >
                    {inputs}

                    <DialogFooter>
                        {signInRequest ? (
                            <Spinner size={SpinnerSize.medium} />
                        ) : (
                            <PrimaryButton onClick={this.submit} text={i18n.get("_commonSettings.signIn.action")} />
                        )}
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }
}

LoginForm.propTypes = {
    config: PropTypes.object,
    props: PropTypes.object,
    auth: PropTypes.object,
    signIn: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        loginForm: state.loginForm,
        auth: state.auth,
    };
}

const actions = dispatch => {
    return bindActionCreators({ signIn }, dispatch);
};

export default connect(
    mapStateToProps,
    actions,
)(LoginForm);
