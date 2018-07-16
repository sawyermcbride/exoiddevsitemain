const express = require('express');
const app = express();
const path = require('path');
const mustacheExpress = require('mustache-express');
const rgex = /.*\.[A-Za-z]+/;
const content = require('./content.json');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, '/pages'));


console.log('app running');

app.get('/', (req,res)=> {
    res.render('home', content);
});

//regex checks if the url is a file request, if so it passes it onto the next middleware
app.use((req, res, next) => {    
    console.log(req.url);
    if(rgex.test(req.path.trim())) {
        next();
    } else {
        res.render(req.path.substring(1, req.path.length), content);
    }
});

app.use(express.static('./assets'));

app.use( (err, req, res, next) => {
    console.log('err');
    console.log(err);
    res.send('Not Found');
});

app.listen(3000);