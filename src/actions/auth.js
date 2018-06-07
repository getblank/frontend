import { authActions } from "./types";
import * as blankClient from "services/blankClient";

export const signIn = args => {
    return async dispatch => {
        dispatch({
            type: authActions.SIGN_IN,
        });

        try {
            const user = await blankClient.signIn(args);
            dispatch({
                type: authActions.SIGN_IN_RESPONSE,
                payload: { user },
            });
        } catch (err) {
            dispatch({
                type: authActions.SIGN_IN_RESPONSE,
                payload: { err },
            });
        }
    };
};
