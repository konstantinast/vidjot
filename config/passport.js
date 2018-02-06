const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = (passport) => {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        // Match user
        User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return done(null, false, {message: 'No User Found'});
            }
            
            // Match password
            if (user) {
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error) throw error;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        done(null, false, {message: 'Password Incorrect'});
                    }
                });
            }
        });
    }));
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};