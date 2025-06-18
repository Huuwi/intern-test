// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'docs.yaml'));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Intern API",
            version: "1.0.0",
            description: "Documentation for Intern API",
        },
        servers: [
            {
                url: "http://localhost:8001",
            },
        ],
    },
    apis: ["./src/api/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            withCredentials: true
        }
    }));
}

module.exports = swaggerDocs;
