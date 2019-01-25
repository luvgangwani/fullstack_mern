import config, { nodeEnv, logStars } from './config';

import express from 'express';

import apiRouter from './api';

import serverRender from './serverRender';

var app = express();

app.use("/bundle", express.static(__dirname + "/public"));

app.use("/styles", express.static(__dirname + "/public/css"));
app.use("/scripts", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/images"));

app.use("/res-styles", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/res-scripts", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/popper", express.static(__dirname + "/node_modules/popper.js/dist/umd"));

app.use("/api", apiRouter);

app.set("view engine", "ejs");

app.get(['/','/contests/:contestId'], function(request, response){
    serverRender(request.params.contestId)
    .then(({ initialMarkup, initialData }) => {
        response.render("index", {
            title: "Home Page",
            initialMarkup: initialMarkup,
            initialData: initialData
        });
    })
    .catch(error => console.log(error))
});

app.get("/about", function(request, response){
    response.render("about", {
        title: "About Us",
        // body: "This is the about us page."
    });
});

app.listen(config.port, config.host, function(request, response){
    console.log("Server started at ",config.port);
});