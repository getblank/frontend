const timeout = t => new Promise(resolve => setTimeout(resolve, t));

const signIn = async args => {
    console.log("signIn arguments:", args);
    await timeout(2500);

    return { _id: "42" };
};

export { signIn };
