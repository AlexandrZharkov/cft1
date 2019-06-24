module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function(config, env) {
        // ...add your webpack config
        return config;
    },

    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);

            let newConfig = {...config , headers :{
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                }};
            console.log(newConfig);

            return newConfig;
        };
    },
};