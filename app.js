
var express = require("express");

var path= require("path");

var app =new express();

var mongoose = require("mongoose");
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
var cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
var routes =require("./routes/routes");

app.listen(4000);




let dbUrl = 'mongodb://127.0.0.1:27017/Forum';
mongoose.connect(dbUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connect error !'));
db.once('open', function() {
    console.log('Mongodb started !');
});



app.set("views" , path.join(process.cwd(),"app/view"));
app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), 'public')));  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(session({
    secret: 'Froum',
    resave: false,
    name : 'name',
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));


routes(app);

