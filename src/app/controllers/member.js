const MembersDB = require('../models/membersDB');
const { age, date } = require('../../lib/utils');
const membersDB = require('../models/membersDB');

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
            callback(members) {
                const pagination = {
                    total: Math.ceil(members[0].total / limit), 
                    page
                }

                return res.render('members/index', { members, pagination, filter })
            },
        };

        MembersDB.paginate(params);
    },

    create(req, res) {

        membersDB.instructorOptions(function(instructorOptions) {
            if (!instructorOptions) {
                return res.send('Instrcutor Options are causing errors!');
            };

            return res.render('members/create', { instructorOptions });
        });
    },

    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields!')
        };
                          // data,     callback(results.row[0])
        MembersDB.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`)
        });

    },

    show(req, res) {
        MembersDB.find(req.params.id, function(member) {
            if (!member) {
                return res.send('Member not found!');
            };

            member.birth = date(member.birth).birthDay;

            return res.render('members/show', { member })
        });
    },

    edit(req, res) {
        MembersDB.find(req.params.id, function(member) {
            if (!member) {
                return res.send('Member not found!');
            };

            member.birth = date(member.birth).iso

            membersDB.instructorOptions(function(instructorOptions) {
                if (!instructorOptions) {
                    return res.send('Instrcutor Options are causing errors!');
                };

                return res.render('members/edit', { member, instructorOptions })
            });
        });
    },

    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields!')
        };

        MembersDB.update(req.body, function() {
            return res.redirect(`members/${req.body.id}`)
        });
    },

    delete(req, res) {
        MembersDB.delete(req.body.id, function() {
            return res.redirect(`members/`);
        });
    },
};