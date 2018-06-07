import { findProperty } from "services/finder";

class ConfigProcessor {
    getAllLocales(config) {
        const cs = findProperty(config, "_commonSettings.entries") || {};

        return (Array.isArray(cs.locales) && cs.locales) || ["en"];
    }

    getAppTitle(config) {
        return findProperty(config, "_commonSettings.entries.title") || "Blank App";
    }

    getI18nContent(config) {
        const res = {};
        const locales = this.getAllLocales(config);
        const defaultLocale = this.getDefaultLocale();
        locales.forEach(l => (res[l] = {}));

        for (const storeName of Object.keys(config || {})) {
            const storeDesc = config[storeName];
            if (!storeDesc.i18n) {
                continue;
            }

            for (const locale of locales) {
                const content = storeDesc.i18n[locale];
                if (!content && locale === defaultLocale) {
                    res[locale][storeName] = storeDesc.i18n;
                    continue;
                }

                res[locale][storeName] = content;
            }
        }

        return res;
    }

    getDefaultLocale(config) {
        const cs = findProperty(config, "_commonSettings.entries") || {};

        return cs.defaultLocale || (Array.isArray(cs.locales) && cs.locales[0]) || "en";
    }

    getNav(config) {
        const navStore = config._nav;
        if (!navStore) {
            throw new Error("nav store does not exists");
        }

        const { entries } = navStore;
        if (!entries) {
            throw new Error("nav store has not entries");
        }

        const res = Object.keys(entries).map(e => {
            const item = entries[e];
            return {
                key: e,
                label: item.label || `label for ${e} does not exists`,
                href: e,
                navOrder: item.navOrder || 0,
            };
        });

        Object.keys(config).forEach(e => {
            const item = config[e];
            if (e[0] === "_" || !e.display || e.display === "none") {
                return;
            }

            if (!item.navGroup) {
                res.push({
                    key: e,
                    label: item.label || `label for ${e} does not exists`,
                    href: e,
                    navOrder: item.navOrder || 0,
                });
            }
        });

        res.sort((a, b) => a.navOrder - b.navOrder);

        return res;
    }

    getSignInProps(config) {
        return findProperty(config, "_commonSettings.entries.signInProps");
    }
}

const cp = new ConfigProcessor();

export default cp;
