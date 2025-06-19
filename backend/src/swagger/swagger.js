// swagger.js
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'docs.yaml'));

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            withCredentials: true
        }
    }));
}

module.exports = swaggerDocs;
