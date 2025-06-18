const chalk = require("chalk");

let count = 0
let end = 30
let logsItv = setInterval(() => {
    console.log(chalk.yellowBright(`Server is starting... Please wait for ${end - count} seconds to ensure the database is ready.`));
    count++;
    if (count == end) {
        console.log(chalk.greenBright("Server started successfully!"));
        console.log(chalk.bgCyanBright("You can now access the API at http://localhost:8001/api-docs "));
        clearInterval(logsItv)
    }
}, 1000);


setTimeout(() => {
    const express = require("express");
    require("dotenv").config({ path: "./.env" });
    const { createServer } = require("http");
    const { authApi } = require("./src/api/authApi.js")
    const { userApi } = require("./src/api/userApi.js")
    const { adminApi } = require("./src/api/adminApi.js")
    require('dotenv').config({ path: "./.env" })
    const Connection = require("./src/database/connection.js")
    const configServer = require("./src/config/configServer.js")
    const swagger = require("./src/swagger/swagger.js")

    // Initialize database connection
    globalThis.connection = new Connection();
    globalThis.connection.connect()


    const app = express();
    const httpServer = createServer(app);

    //config
    configServer(app)

    //swagger
    swagger(app)

    //use API route
    app.use("/api", authApi)
    app.use("/api", userApi)
    app.use("/api", adminApi)

    // Run the app
    let PORT = process.env.PORT || 8001;
    httpServer.listen(PORT, () => {
        console.log("httpServer is running on port:", PORT);
    });
}, end * 1000 + 1000); // wait 30 seconds before starting the server to ensure the database is ready


