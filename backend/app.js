var express = require('express');
var cors = require('cors');
var app = express();

var Raven = require('raven');

// Must configure Raven before doing anything else with it
Raven.config('https://dddc44f682974e31af4331d292f3055c@sentry.io/300067').install();

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());
app.use(cors())

app.get('/*', function (req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    })
});

app.post('/*', function (req, res, next) {
    // res.json({
    //     msg: 'This is CORS-enabled for all origins!POST'
    // })
    var transactionId = req.header('transactionId');
    Raven.setContext({ tags: {'transactionId': transactionId}});
    next(new Error('Sample Error'));
});

app.options('/*', function (req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins! OPTOINS'
    })
});

app.use(Raven.errorHandler());

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
});
