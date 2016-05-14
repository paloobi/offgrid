'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;
    
    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileFields: ['id', 'displayName', 'email']
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        console.log(profile);

        UserModel.findOne({ 'facebook.id': profile.id }).exec()
            .then(function (user) {

                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        name: profile.displayName,
                        email: profile.email,
                        facebook: {
                            id: profile.id
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { 
            successRedirect: '/map', 
            failureRedirect: '/login' 
        }),
        function (req, res) {
            res.redirect('/');
        });

};
