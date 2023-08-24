const db = require('../../config/dbConnection');

exports.home = (req, res) => {
    try {
        db.all(`SELECT * FROM experiences`, (err, rows) => {
            res.render('home', {activities: rows, req: req});
        });
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};




exports.exp = (req, res) => {
    try {
        const expType = req.query.type;
        if (expType) {
            db.all(`SELECT * FROM experiences WHERE exp_type = ?`, [expType], (err, rows) => {
                if (err) {
                    console.error(err);
                    return res.render('500');
                }
                res.render('experiences', {activities: rows});
            });
        } else {
            db.all(`SELECT * FROM experiences`, (err, rows) => {
                if (err) {
                    console.error(err);
                    return res.render('500');
                }
                res.render('experiences', {activities: rows});
            });
        }
    } catch (error) {
        console.error(error);
        res.render('500');
    }
};




exports.searchByRegion = (req, res) => {
    try {
        const { region } = req.params;
        db.all(`SELECT * FROM experiences WHERE region = ?`, [region],
            (err, rows) =>{
                if (rows.length === 0) {
                    console.log(rows);
                    return res.render('404');                   
                }
                res.json({activities: rows});
            });
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};

exports.searchByType = (req, res) => {
    try {
        const expType = req.body.experience;
        db.all(`SELECT * FROM experiences WHERE exp_type = ?`, [expType], (err, rows) => {
            if (err) {
                console.error(err);
                return res.render('500');
            }
            res.redirect(`/experiences?type=${expType}`);
        });
    } catch (error) {
        console.error(error);
        res.render('500');
    }
};


exports.getTopExperiences = (req, res) => {
    try {
        db.all(`SELECT * FROM experiences LIMIT 4`, (err, rows) => {
            res.render('home', {topExperiences: rows});
        });
        
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};

exports.contact = (req, res) => {
    try {
         res.render('contact');
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};


exports.add = (req, res) => {
    try {
        const {
                exp_name, exp_type, country, region, lon, lat, exp_description
              } = req.body;
        db.run(`INSERT INTO experiences (exp_name, exp_type, country, region, lon, lat, exp_description)
        VALUES (?,?,?,?,?,?,?)`, [exp_name, exp_type, country, region, lon, lat, exp_description],
        () => {
            console.log(`Activity has been added.`);
        });      
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};


exports.book = (req, res) => {
    try {
        const  id  = req.params.id;
        db.run(`UPDATE experiences SET bookings = bookings + 1 WHERE id =?`, [id], () => {
            console.log(`Booking has been updated with the id ${id}`);
        });
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};