const rgx = /^(.+)\[(\d+)\]$/;

export const findProperty = (obj, prop) => {
    if (obj == null) {
        return null;
    }

    if (!prop) {
        return obj;
    }

    const index = prop.indexOf(".");
    const subProp = index > -1 ? prop.substring(0, index) : prop;
    const matches = rgx.exec(subProp);
    if (matches) {
        if (obj[matches[1]] == null) {
            return null;
        }

        return findProperty(obj[matches[1]][matches[2]], index > -1 ? prop.substr(index + 1) : null);
    }

    return findProperty(obj[subProp], index > -1 ? prop.substr(index + 1) : null);
};
