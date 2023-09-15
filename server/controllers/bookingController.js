const db = require('../../config/dbConnection');


exports.booking_page = (req, res) => {
    try {
        console.log("Received query parameters:", req.query);
        res.render('booking', { 
            activityId: req.query.activityId, 
            expName: req.query.expName,
            expType: req.query.expType,
            country: req.query.country,
            region: req.query.region,
            expDescription: req.query.expDescription,
            img_url: req.query.img_url
        });
    } catch (error) {
        console.error(error);
        res.render('500');
    }
};


exports.confirmBooking = (req, res) => {
    const { activityId, people } = req.body;
    try {
        db.run(`UPDATE experiences SET bookings = bookings + 1 WHERE id = ?`, [activityId], (err) => {
            if (err) {
                console.error("Error in first query: ", err);
                return res.status(500).json({ message: 'Failed to book the experience.' });
            }
            console.log("First query executed successfully");

            // Insert the booking record into the bookings table
            db.run(`INSERT INTO bookings (people, expID) VALUES (?, ?)`, [people, activityId], (err) => {
                if (err) {
                    console.error("Error in second query: ", err);
                    return res.status(500).json({ message: 'Failed to update the bookings table.' });
                }

                console.log("Second query executed successfully");
                res.json({ message: 'Booking successful.' });
            });
        });
    } catch (error) {
        console.error("Exception caught: ", error);
        res.status(500).render('500');
    }
};




