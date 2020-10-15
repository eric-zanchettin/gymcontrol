const express = require('express');
const routes = express.Router();
const instructor = require('./app/controllers/instructor');
const member = require('./app/controllers/member');

routes.get('/', (req, res) => {
    return res.redirect('/instructors');
});

routes.get('/instructors', instructor.index);
routes.get('/instructors/create', instructor.create);
routes.post('/instructors', instructor.post);
routes.put('/instructors', instructor.put);
routes.delete('/instructors', instructor.delete);
routes.get('/instructors/:id', instructor.show);
routes.get('/instructors/:id/edit', instructor.edit);

routes.get('/members', member.index);
routes.get('/members/create', member.create);
routes.post('/members', member.post);
routes.put('/members', member.put);
routes.delete('/members', member.delete);
routes.get('/members/:id', member.show);
routes.get('/members/:id/edit', member.edit);

module.exports = routes;