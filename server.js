const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.use((request, response, next) => {
    response.render('maintenance.hbs');
    // no next();  -> execution stops here
});

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    // response.send({
    //     last_name: 'Kao',
    //     first_name: 'Clayton',
    //     Likes: [
    //         'Mountain Climbing',
    //         'Biking',
    //         'Jogging'
    //     ]
    // });
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Data().getFullYear()
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Page Not Found'
    });

});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});