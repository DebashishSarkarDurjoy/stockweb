// Stock Market Portfolio App by Debashish Sarkar Durjoy updated
const express = require("express");
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API Key = pk_a95da989183f43acba5b2a0f4c7527f8 
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_a95da989183f43acba5b2a0f4c7527f8', {json:true}, (err, res, body) => {
        if (err) {return console.log(err);}
        console.log(body);
        if (res.statusCode === 200) {
            //console.log(body);
            finishedAPI(body);
        }
    });
}

// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff";

// Set handlebar index GET route
app.get('/', function(req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, "fb") 
});

// Set handlebar index POST route
app.post('/', function(req, res) {
    call_api(function(doneAPI) {
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI
        });
    }, req.body.stock_ticker) 
});
// Create about page routes
app.get('/about.html', function(req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log("Server listening on port: " + PORT));


