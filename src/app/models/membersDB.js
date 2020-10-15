const { date } = require('../../lib/utils');
const db = require('../../../config/db');

module.exports = {
    all(callback) {
        db.query('SELECT * FROM members', null, function(err, results) {
            if(err) {
                throw 'DATABASE ERROR!'
            };
            
            callback(results.rows);
        });
    },

    create(data, callback) {
        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                gender,
                email,
                birth,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9
            ) RETURNING ID
        `;

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
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
            M.*,
            (
                SELECT
                I.name
                FROM instructors I
                WHERE I.id = M.instructor_id
            ) AS instructor_name
            FROM members M
            WHERE id = $1
        `, [id], function(err, results) {
            if (err) {
                throw 'DATABASE ERROR!'
            };

            callback(results.rows[0]);
        });
    },

    update(data, callback) {
        const query = `
        UPDATE members
        SET avatar_url = ($1),
        name = ($2),
        birth = ($3),
        gender = ($4),
        email = ($5),
        blood = ($6),
        weight = ($7),
        height = ($8),
        instructor_id = ($9)
        WHERE id = $10
        `
    
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
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
            DELETE FROM members
            WHERE id = $1
        `, [id], function(err, results) {
            if (err) {
                console.log(err);
                throw 'DATABASE ERROR!';
            };

            return callback();
        });
    },

    instructorOptions(callback) {
        db.query(`
            SELECT
            id,
            name
            FROM instructors
        `, null, function(err, results) {
            if (err) {
                console.log(err);
                throw 'DATABASE ERROR!';
            };

            callback(results.rows);
        });
    },

    paginate(params) {
        let { filter, limit, offset, callback } = params;

        let query = `
        `
        let filterQuery = ``
        let totalQuery = `(
            SELECT COUNT(*) FROM members M
        ) AS total`

        if (filter) {
            
            filterQuery = `
                WHERE M.name ILIKE '%${filter}%'
                OR M.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT
                COUNT(*)
                FROM members M
                ${filterQuery}
            ) AS total`;
        };

        query = `
            SELECT
            M.*,
            ${totalQuery}
            FROM members M
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