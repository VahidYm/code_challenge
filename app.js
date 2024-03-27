'use strict';

const express = require('express');
const app = module.exports = express();
const path = require('path');
const http = require('http');
const methodOverride = require('method-override');
// import swaggerUi from "swagger-ui-express";
// import swaggerOptions from "../helpers/swaggerOptions";
// import swaggerJSDoc from "swagger-jsdoc";
// const swaggerSpec = swaggerJSDoc(swaggerOptions);
const { connectMongoDB } = require('./db/mongoose');
const { seedDB } = require('./db/seed');
const { errorHandler, errorGenerator} = require('./helpers/error');

class Application {
    server;
    constructor() {
        this.server;
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setViewEngine();
        this.setRouters();
        // this.startServer();
    }

    setupExpress() {
        this.server = http.createServer(app);
    }
    setMongoConnection() {
        connectMongoDB();
        new seedDB();
    }
    setConfig() {
        app.use(express.json());
        app.use(express.urlencoded({ extended : false }));
        app.use(methodOverride('_method'));
    }
    setViewEngine() {
        // set the view engine to ejs
        app.set('view engine', 'ejs');  
        app.set('views', path.join(__dirname, 'views'));
    }
    setRouters() {
        app.use('/', require('./routes/profile')());
        app.use('/user', require('./routes/user')());
        app.use('/comment', require('./routes/comment')());
        app.all('*', () => {
            throw new errorGenerator("Page not found", 404);
        });
        app.use(errorHandler);
    }
    // startServer() {
    //     const port =  process.env.PORT || 3030;
    //     this.server = app.listen(port , () => log.info(`Listening on port ${port}`));

    //     process.on('SIGTERM', () => {
    //         log.info('SIGTERM signal received: closing HTTP server')
    //         this.server.close(() => {
    //             log.info('HTTP server closed')
    //         })
    //     });
    // }
}

module.exports = Application;