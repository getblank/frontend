import { configActions } from "actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case configActions.GET_CONFIG:
            if (!state.config && !state.fetching) {
                return { fetching: true };
            }

            return state;

        case configActions.GET_CONFIG_RESPONSE: {
            const { config, nav, appTitle, i18n, defaultLocale } = action.payload;
            return {
                fetching: false,
                i18n: { content: i18n, defaultLocale },
                config,
                nav,
                appTitle,
            };
        }
        default:
            return state;
    }
};
