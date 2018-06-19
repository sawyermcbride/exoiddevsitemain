const express = require('express');
const app = express();
const path = require('path');

const rgex = /.*\.[A-Za-z]+/;
const data = 
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/pages'));


console.log('app running');

app.get('/', (req,res)=> {
    res.render('home', require('./content.json'));
});

//regex checks if the url is a file request, if so it passes it onto the next middleware
app.use((req, res, next) => {    
    if(rgex.test(req.path.trim())) {
        next();
    } else {
        res.render(req.path, JSON.parse(require('./content.json')));
    }
});

app.use(express.static('assets'));

app.use( (err, req, res, next) => {
    console.log('err');
    console.log(err);
    res.send('Not Found');
});

app.listen(3000);