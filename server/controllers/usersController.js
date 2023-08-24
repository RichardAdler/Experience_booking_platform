const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the user already exists
        db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
            if (row) {
                return res.send('User with this email already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user
            db.run(`INSERT INTO users (email, username, password) VALUES (?, ?, ?)`, [email, username, hashedPassword], (err) => {
                if (err) {
                    console.error(err);
                    return res.send('Error registering the user.');
                }

                res.send('Registration successful');
            });
        });

    } catch (error) {
        console.error(error);
        res.send('Server error');
    }
};
