/**
 * Description: This is for the institution based search author table.
 *
 * @author Om prakash and saitharun
 * @lastModified 2023-11-30 LastModifiedDate
 */

const express = require('express');
const publicationData = require('./sampleData/publicationData.json');
const router = express.Router();

module.exports = function (db) {
    router.post('/storePublication', (req, res) => {

        //Check if publication is already available in database
        const checkPublication = 'SELECT * FROM publications WHERE title=?';

        db.query(checkPublication, [req.body.title], (checkErr, checkResult) => {
            if (checkErr) {
                return res.status(500).json('Error while checking duplicate publication records', err);
            }

            if (checkResult.length > 0) {
                const response = {
                    status: "duplicate",
                    message: "Duplicate record found for Publication"
                };
                return res.status(400).json(response);
            }

            //Insertion starts here

            //Insert publication data into publications table
            const pSql = 'INSERT INTO publications (title, year, publication_location, pages) VALUES(?,?,?,?)';
            pvalues = [
                req.body.title,
                req.body.year,
                req.body.appearance,
                req.body.pages
            ];

            db.query(pSql, pvalues, (perr, presult) => {
                if (perr) {
                    return res.status(500).json("Error while inserting into publications table", perr);
                }

                const pid = presult.insertId;

                req.body.authors.forEach(data => {

                    //Check if Author is available in database
                    const checkAuthor = 'SELECT * FROM authors WHERE email=?';

                    db.query(checkAuthor, [data.email], (checkErr, checkResult) => {
                        if (checkErr) {
                            return res.status(500).json('Error while checking duplicate author records', err);
                        }

                        if (checkResult.length > 0) {
                            const authorId = checkResult[0].author_id;
                            // Link the existing author with the publication
                            const paSql = 'INSERT INTO publication_authors (publication_id, author_id) VALUES (?, ?)';
                            db.query(paSql, [pid, authorId], (paErr, paResult) => {
                                if (paErr) {
                                    return res.status(500).json("Error while inserting into publication_authors table", paErr);
                                }
                                const response = {
                                    status: "success",
                                    data: paResult
                                };
                                return res.status(200).json(response);

                            });
                        } else {
                            //Insert Author into authors table
                            const aSql = 'INSERT INTO authors (name, institution, department, email, address, homepage) VALUES(?,?,?,?,?,?)';
                            avalues = [
                                data.name,
                                data.institution,
                                data.department,
                                data.email,
                                data.address,
                                data.homePage
                            ];
                            db.query(aSql, avalues, (aerr, aresult) => {
                                if (aerr) {
                                    return res.status(500).json("Error while inserting into authors table", aerr);
                                }

                                const aid = aresult.insertId;

                                // Link the existing author with the publication
                                const paSql = 'INSERT INTO publication_authors (publication_id, author_id) VALUES (?,?)';
                                pavalues = [
                                    pid,
                                    aid
                                ]

                                db.query(paSql, pavalues, (paErr, paResult) => {
                                    if (paErr) {
                                        return res.status(500).json("Error while inserting into publication_authors table", paErr);
                                    }
                                    const response = {
                                        status: "success",
                                        data: paResult
                                    };
                                    return res.status(200).json(response);

                                })
                            })

                        }

                    });

                });

            });

        })




    });

    router.get('/allPublications', (req, res) => {
        const publicationsQuery = `SELECT p.*, a.*
            FROM publications p
            LEFT JOIN publication_authors pa ON p.publication_id = pa.publication_id
            LEFT JOIN authors a ON pa.author_id = a.author_id
            ORDER BY p.year DESC`;

        db.query(publicationsQuery, (err, results) => {
            if (err) {
                return res.status(500).json('Error while fetching publications', err);
            }

            const response = {
                status: 'success',
                data: results
            }
            return res.status(200).json(response);
        });
    });


    router.get('/allAuthors', (req, res) => {
        const authorsQuery = `SELECT name FROM authors`;

        db.query(authorsQuery, (err, results) => {
            if (err) {
                return res.status(500).json('Error while fetching Authors', err);
            }

            const response = {
                status: 'success',
                data: results
            }
            return res.status(200).json(response);
        });
    });

    router.get('/allDepartments', (req, res) => {
        const authorsQuery = `SELECT department FROM authors`;

        db.query(authorsQuery, (err, results) => {
            if (err) {
                return res.status(500).json('Error while fetching Departments', err);
            }
            
            const response = {
                status: 'success',
                data: results
            }
            return res.status(200).json(response);
        });
    });

    router.get('/allInstitutions', (req, res) => {
        const authorsQuery = `SELECT institution FROM authors`;

        db.query(authorsQuery, (err, results) => {
            if (err) {
                return res.status(500).json('Error while fetching Institutions', err);
            }
            
            const response = {
                status: 'success',
                data: results
            }
            return res.status(200).json(response);
        });
    });

    router.get('/author?*', (req, res) => {
        const authorName = req.query.name;
        const authorsQuery = `SELECT p.*, a.* FROM publications p 
        LEFT JOIN publication_authors pa ON p.publication_id = pa.publication_id
        LEFT JOIN authors a ON pa.author_id = a.author_id WHERE a.name='${authorName}'`;

        db.query(authorsQuery, (err, results) => {
            if (err) {
                return res.status(500).json('Error while fetching records from selected author', err);
            }
            
            const response = {
                status: 'success',
                data: results
            }
            return res.status(200).json(response);
        });
    });

    router.get('/department?*', (req, res) => {
        const departmentName = req.query.name;
        const departmentssQuery = `SELECT p.*, a.* FROM publications p 
        LEFT JOIN publication_authors pa ON p.publication_id = pa.publication_id
        LEFT JOIN authors a ON pa.author_id = a.author_id WHERE a.department='${departmentName}'`;

        db.query(departmentssQuery, (err, results) => {
            if (err) {
                return res.status(500).json('Error while fetching records from selected department', err);
            }
            
            const response = {
                status: 'success',
                data: results
            }
            return res.status(200).json(response);
        });
    });

    router.get('/institution?*', (req, res) => {
        const institutionName = req.query.name;
        const institutionsQuery = `SELECT p.*, a.* FROM publications p 
        LEFT JOIN publication_authors pa ON p.publication_id = pa.publication_id
        LEFT JOIN authors a ON pa.author_id = a.author_id WHERE a.institution='${institutionName}'`;

        db.query(institutionsQuery, (err, results) => {
            if (err) {
                return res.status(500).json('Error while fetching records from selected institution', err);
            }
            
            const response = {
                status: 'success',
                data: results
            }
            return res.status(200).json(response);
        });
    });





    return router;
};