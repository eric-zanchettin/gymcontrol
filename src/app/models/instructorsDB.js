const { date } = require('../../lib/utils');
const db = require('../../../config/db');
const { query, off } = require('../../../config/db');

module.exports = {
    all(callback) {
        db.query(`
            SELECT
            I.*,
            (
                SELECT
                COUNT(*)
                FROM members M
                WHERE M.instructor_id = I.id
            ) AS qt_students
            FROM instructors I
            ORDER BY qt_students DESC
        `, null, function(err, results) {
            if(err) {
                throw 'DATABASE ERROR!'
            };
            
            callback(results.rows);
        });
    },

    create(data, callback) {
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                birth,
                services,
                created_at
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            ) RETURNING ID
        `;

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            date(data.birth).iso,
            data.services,
            date(Date.now()).iso
        ];

        db.query(query, values, function(err, results) {
            if (err) {
                console.log(err);
                throw 'DATABASE ERROR!'
            };

            callback(results.rows[0]);

        });
    },

    find(id, callback) {
        db.query(`
            SELECT
            *
            FROM instructors
            WHERE id = $1
        `, [id], function(err, results) {
            if (err) {
                throw 'DATABASE ERROR!'
            };

            callback(results.rows[0]);
        });
    },

    findBy(filter, callback) {
        db.query(`
            SELECT
            Ins.*,
            (
                SELECT
                COUNT(*)
                FROM members M
                WHERE M.instructor_id = Ins.id
            ) AS qt_students
            FROM instructors Ins
            WHERE Ins.name ILIKE '%${filter}%'
            OR Ins.services ILIKE '%${filter}%'
            ORDER BY qt_students DESC
        `, null, function(err, results) {
            if(err) {
                console.log(err);
                throw 'DATABASE ERROR!';
            };
            
            callback(results.rows);
        });
    },

    update(data, callback) {
        const query = `
        UPDATE instructors
        SET avatar_url = ($1),
        name = ($2),
        birth = ($3),
        gender = ($4),
        services = ($5)
        WHERE id = $6
        `
    
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) {
                console.log(err)
                throw 'DATABASE ERROR!'
            };

            callback();
        });
    },

    delete(id, callback) {
        db.query(`
            DELETE FROM instructors
            WHERE id = $1
        `, [id], function(err, results) {
            if (err) {
                console.log(err);
                throw 'DATABASE ERROR!';
            };

            return callback();
        });
    },

    paginate(params) {
        let { filter, limit, offset, callback } = params;

        let query = `
        `
        let filterQuery = ``
        let totalQuery = `(
            SELECT COUNT(*) FROM instructors
        ) AS total`

        if (filter) {
            
            filterQuery = `
                WHERE I.name ILIKE '%${filter}%'
                OR I.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT
                COUNT(*)
                FROM instructors I
                ${filterQuery}
            ) AS total`;
        };

        query = `
            SELECT
            I.*,
            (
                SELECT
                COUNT(*)
                FROM members M
                WHERE M.instructor_id = I.id
            ) AS qt_students,
            ${totalQuery}
            FROM instructors I
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `;
        
        db.query(query, [limit, offset], function(err, results) {
            if (err) {
                console.log(err);
                throw 'DATABASE ERROR!';
            };

            callback(results.rows);
        });
    },
};