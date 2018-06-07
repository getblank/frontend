import Enum from "utils/enum";

export const configActions = Enum("GET_CONFIG", "GET_CONFIG_RESPONSE", "GET_CONFIG_ERROR");

export const navigationAction = Enum("NAVIGATE_TO");

export const authActions = Enum("SIGN_IN", "SIGN_IN_RESPONSE", "SIGN_IN_ERROR", "SIGN_OUT", "REGISTER");
