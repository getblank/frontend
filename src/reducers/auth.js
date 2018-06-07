import { authActions } from "actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case authActions.SIGN_IN:
            return {
                signInRequest: true,
                signedIn: false,
            };
        case authActions.SIGN_IN_RESPONSE:
            return {
                signInRequest: false,
                signedIn: true,
                user: action.payload.user,
            };
        case authActions.SIGN_IN_ERROR:
            return {
                signInRequest: false,
                signedIn: false,
                err: action.payload.err,
            };
    }

    return state;
};
