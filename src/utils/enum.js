export default (...args) => {
    const res = {};
    for (const a of args) {
        res[a] = a;
    }

    return res;
};
