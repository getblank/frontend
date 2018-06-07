/**
 * Created by kib357 on 05/11/15.
 */

import handlebars from "handlebars";
import { findProperty } from "services/finder";
import pluralize from "handlebars-pluralize";

handlebars.registerHelper("pluralize", pluralize);

handlebars.registerHelper("i18n", function(context, block) {
    const res = findProperty(block.data.root.$i18n, context);
    return res;
});

handlebars.registerHelper("round", function(context) {
    return Math.round(context);
});

handlebars.registerHelper("toFixed", function(context, decimals) {
    return parseFloat(context).toFixed(decimals || 2);
});

handlebars.registerHelper("ifEquals", function(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

handlebars.registerHelper("switch", function(value, options) {
    this._switch_value_ = value;
    const html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;

    return html;
});

handlebars.registerHelper("case", function(value, options) {
    if (value == this._switch_value_) {
        return options.fn(this);
    }
});

handlebars.registerHelper("or", function(value, options) {
    return value || options;
});

export default class TemplateEngine {
    static render(template, model, noEscape) {
        return handlebars.compile(template, { noEscape })(model);
    }

    static compile(template, noEscape) {
        return handlebars.compile(template, { noEscape });
    }
}
