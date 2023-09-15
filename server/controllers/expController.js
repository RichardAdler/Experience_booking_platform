const db = require('../../config/dbConnection');
const util = require('util');

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



// exports.searchByRegion = (req, res) => {
//     try {
//         const { region } = req.params;
//         db.all(`SELECT * FROM experiences WHERE region = ?`, [region],
//             (err, rows) =>{
//                 if (rows.length === 0) {
//                     console.log(rows);
//                     return res.render('404');                   
//                 }
//                 res.json({activities: rows});
//             });
//     } catch (error) {
//         console.error(err);
//         res.render('500');
//     }
// };


exports.search = async (req, res, next) => {
  const { region, country } = req.query;
  
  let query = 'SELECT * FROM experiences WHERE 1=1';  // Base query
  const params = [];
  
  if (region) {
    query += ' AND region = ?';
    params.push(region);
  }

  if (country) {
    query += ' AND country = ?';
    params.push(country);
  }
  
  try {
    console.log('Query:', query);
    console.log('Params:', params);
    db.allAsync = util.promisify(db.all).bind(db);
    
    const rows = await db.allAsync(query, params);
    res.json({ activities: rows });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

exports.bookExperience = (req, res) => {
    const experienceId = req.params.id;

    db.run(`UPDATE experiences SET bookings = bookings + 1 WHERE id = ?`, [experienceId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to book the experience.' });
        }
        res.json({ message: 'Booking successful.' });
    });
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
exports.addExperience = (req, res) => {
    try {
        res.render('addExperience');
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};


exports.add = (req, res) => {
    console.log(req.file); 
    try {
        const {
            exp_name, exp_type, country, region, longitude, latitude, exp_description
        } = req.body;
        const img_url = req.file.path;         
        // Validate received data
        if (!exp_name || !exp_type || !country || !region || !exp_description) {
            console.error('Validation failed: Missing required fields.');
            return res.status(400).json({ message: 'Validation failed: Missing required fields.' });
        }

        db.run(`INSERT INTO experiences (exp_name, exp_type, country, region, lon, lat, exp_description, img_url)
        VALUES (?,?,?,?,?,?,?,?)`, [exp_name, exp_type, country, region, longitude, latitude, exp_description, img_url],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to add the experience.' });
            }
            res.json({ message: `Activity has been added.` });
        });      
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
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


exports.getMap = (req, res) => {
    try {
        res.render('map');
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};
//This needs to be moved into the middleware folder and import it into the route file experiences.ejs
exports.get_all = (req, res, next) => {
    try {
        db.all(`SELECT * FROM experiences`, (err, rows) => {
            if (err){
                console.error(err);
                res.render('500');
            }
            res.locals.experiences = rows;
            next();
        })  
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};


exports.get_all_json = (req, res, next) => {
    try {
        db.all(`SELECT * FROM experiences`, (err, rows) => {
            if (err){
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
