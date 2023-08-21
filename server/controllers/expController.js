const db = require('../../config/dbConnection');

exports.home = (req, res) => {
    try {
        db.get(`SELECT * FROM experiences`, (err, rows) => {
            res.render('home', {activities: rows});
        });
        
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};

exports.exp = (req, res) => {
    try {
        db.get(`SELECT * FROM experiences`, (err, rows) => {
            res.render('experiences', {activities: rows});
        });
        
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};

exports.searchByRegion = (req, res) => {
    try {
        const { region } = req.params;
        db.get(`SELECT * FROM experiences WHERE region = ?`, [region],
            (err, rows) =>{
                if (rows.length === 0) {
                    return res.render('404');
                }
                res.json({activities: rows});
            });
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