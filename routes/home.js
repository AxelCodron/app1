const express = require('express');
const router = express.Router();
const linksForHome =
    [{ url: 'https://www.itsligo.ie', text: 'IT Sligo Home Page' },
    { url: 'https://www.worldwildlife.org', text: 'WWF official website' }];

router.get('/', (req, res) => {

    var message = "";

    if (req.signedCookies.tracking) {
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back, you last visited on : " + dateLastVisit;
    }

    var currentDate = new Date();
    res.cookie('tracking', currentDate.toDateString(), { signed: true });

    res.render('home', { 'message': message, links: linksForHome });
});


router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

router.get('/location', function (req, res) {
    res.render('location');
});

module.exports = router;