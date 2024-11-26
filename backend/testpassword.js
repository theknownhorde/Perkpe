const bcrypt = require('bcryptjs');

// The password you want to hash
const originalPassword = 'ak'; // Replace this with your password

// Hash the password
bcrypt.hash(originalPassword, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    console.log('Hashed Password:', hashedPassword); // Display the hashed password

    // Test the hashed password with an input password
    const inputPassword = 'ak'; // Replace this with the password you want to test

    bcrypt.compare(inputPassword, hashedPassword, (err, isMatch) => {
        if (err) {
            console.error('Error comparing passwords:', err);
        } else if (isMatch) {
            console.log('Password matches!');
        } else {
            console.log('Password does not match.');
        }
    });
});
