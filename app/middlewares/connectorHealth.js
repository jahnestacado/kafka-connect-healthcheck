const stateExtractor = require("./../utils/stateExtractor.js");
const log = require("loglevel");

module.exports = (drKafkaConnectConfig) =>
    function checkConnectorHealth(request, response, next) {
        const connector = request.params.connector;
        stateExtractor
            .assessConnectorsHealth(connector, drKafkaConnectConfig)
            .then((state) => {
                request.healthcheck = state;
                log.trace(
                    `Forwarded healthcheck for connector: ${connector} state to router -> ${JSON.stringify(
                        request.healthcheck
                    )}`
                );
                next();
            })
            .catch(next);
    };
