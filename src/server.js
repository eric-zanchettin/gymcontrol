const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true,
});

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method'))
server.use(routes);

server.listen(3414, () => {
    console.log('Server is running ...')
});