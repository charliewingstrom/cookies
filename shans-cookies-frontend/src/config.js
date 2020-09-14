var config = (() => {
    var serverURL = () => {
        return 'http://localhost:5000'
    }

    return {
        serverURL: serverURL,
    }
})();
export default config;