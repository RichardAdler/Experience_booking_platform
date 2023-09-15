const db = require('../../config/dbConnection');


exports.contact = (req, res) => {
    try {
         res.render('contact');
    } catch (error) {
        console.error(err);
        res.render('500');
    }
};

exports.submitContact = (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.json({ success: false, message: "All fields are required" });
    }
  
    const sql = 'INSERT INTO ContactUs (name, email, message) VALUES (?, ?, ?)';
    
    db.run(sql, [name, email, message], function(err) {
      if (err) {
        return res.json({ success: false, message: 'Database error: ' + err.message });
      }
      res.json({ success: true, message: 'Your message was sent successfully!' });
    });
  };
  
