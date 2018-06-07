import cfg from "./config.json";
import { configActions, navigationAction } from "./types";
import configProcessor from "services/configProcessor";

export const navigateToStore = storeName => {
    return {
        type: navigationAction.NAVIGATE_TO,
        payload: { storeName },
    };
};

export const getConfig = () => {
    return dispatch => {
        // const currentState = getState();
        dispatch({ type: configActions.GET_CONFIG });
        setTimeout(() => {
            const nav = configProcessor.getNav(cfg);
            const appTitle = configProcessor.getAppTitle(cfg);
            const i18n = configProcessor.getI18nContent(cfg);
            const defaultLocale = configProcessor.getDefaultLocale(cfg);
            dispatch({
                type: configActions.GET_CONFIG_RESPONSE,
                payload: { config: cfg, nav, appTitle, i18n, defaultLocale },
            });
        }, 2000);
    };
};
