import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/configdb';
import db from './models/index';
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log("Backend Nodejs is running on the port: " + port);
    });
});