let express = require('express');

let app = express();

app.use(express.static("public"));

let session = require('express-session');

app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
})
);

let router = require('./routes');

app.use(express.urlencoded({extended : true}));

app.use("/", router);

app.listen(3000, function() {
    console.log("running on port 8000");
});