import { findProperty } from "services/finder";

class I18n {
    constructor(config) {
        if (!config) {
            throw new Error("config is required");
        }

        const { defaultLocale, content } = config;
        this._defaultLocale = defaultLocale;
        this._content = content;
        this._cache = {};
    }

    get(...args) {
        if (args.length === 0) {
            throw new Error("key is missing");
        }

        const [key] = args;
        let [, locale] = args;
        const params = args.slice(locale ? 2 : 1);
        locale = locale || this._defaultLocale;
        const content = this._content[locale];

        const res = findProperty(content, key);

        if (params.length === 0) {
            return res;
        }

        let i = 0;
        return res.replace(/%s/g, () => args[i++]);
    }

    getForStore(storeName, locale) {
        if (typeof storeName !== "string") {
            storeName = "";
        }

        if (!locale) {
            locale = this._defaultLocale;
        }

        const key = `${storeName}|${locale}`;
        if (this._cache[key]) {
            return this._cache[key];
        }

        const copy = JSON.parse(JSON.stringify(this._content[locale] || {}));
        const res = copy[storeName] || {};
        res.$settings = copy._commonSettings;
        res.$stores = copy;
        this._cache[key] = res;

        return res;
    }
}

export default I18n;
