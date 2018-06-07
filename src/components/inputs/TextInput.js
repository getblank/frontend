import React, { Component } from "react";
import PropTypes from "prop-types";

import { TextField, MaskedTextField } from "office-ui-fabric-react/lib/TextField";

class TextInput extends Component {
    render() {
        const props = { ...this.props };
        let C = TextField;
        switch (props.display) {
            case "maskedInput":
                C = MaskedTextField;
                break;
            case "password":
                props.type = "password";
        }

        if (!props.label) {
            props.label = " ";
        }

        return <C {...props} />;
    }
}

TextInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    maskFormat: PropTypes.object, // { [key: string]: RegExp }
    errorMessage: PropTypes.string,
    value: PropTypes.any,
    changed: PropTypes.bool,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    className: PropTypes.string,
    underlined: PropTypes.bool,
    multiline: PropTypes.bool,
    onFocus: PropTypes.func,
    onChanged: PropTypes.func.isRequired,
};

export default TextInput;
