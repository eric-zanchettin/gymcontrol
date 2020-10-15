const InstructorsDB = require('../models/instructorsDB');
const { age, date } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query;

        page = page || 1;
        limit = limit || 5;
        offset = limit * (page - 1);

        let params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {
                const pagination = {
                    total: Math.ceil(instructors[0].total / limit), 
                    page
                }

                return res.render('instructors/index', { instructors, pagination, filter })
            },
        };

        InstructorsDB.paginate(params);

        /*
        if ( filter ) {
            InstructorsDB.findBy(filter, function(instructors) {
                return res.render('instructors/index', { instructors });
            });
        } else {
                                   // callback(results.rows)
            InstructorsDB.all(function(instructors) {
                return res.render('instructors/index', { instructors });
            });
        };
        */
    },

    create(req, res) {
        return res.render('instructors/create');
    },

    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields!')
        };
                          // data,     callback(results.row[0])
        InstructorsDB.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        });

    },

    show(req, res) {
        InstructorsDB.find(req.params.id, function(instructor) {
            if (!instructor) {
                return res.send('Instructor not found!');
            };

            instructor.age = age(instructor.birth);
            instructor.services = instructor.services.split(',');

            instructor.created_at = date(instructor.created_at).format;

            return res.render('instructors/show', { instructor })
        });
    },

    edit(req, res) {
        InstructorsDB.find(req.params.id, function(instructor) {
            if (!instructor) {
                return res.send('Instructor not found!');
            };

            instructor.birth = date(instructor.birth).iso

            return res.render('instructors/edit', { instructor })
        });
    },

    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields!')
        };

        InstructorsDB.update(req.body, function() {
            return res.redirect(`instructors/${req.body.id}`)
        });
    },

    delete(req, res) {
        InstructorsDB.delete(req.body.id, function() {
            return res.redirect(`instructors/`);
        });
    },
};