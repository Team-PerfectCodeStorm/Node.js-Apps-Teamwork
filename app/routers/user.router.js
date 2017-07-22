const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('../controllers/users-controller').init(data);

    router
        .get('/register', (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get('/profile', (req, res) => {
            if (req.isAuthenticated()) {
                return controller.getUserProfile(req, res);
            }
            return controller.getSignInForm(req, res);
        })
        .get('/login', (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .get('/add', (req, res) => {
            return controller.getAddForm(req, res);
        })
        .get('/error', (req, res) => {
            return controller.showError(req, res);
        })
        .get('/update', (req, res) => {
            return controller.getUpdateForm(req, res);
        })
        .get('/logout', (req, res) => {
            return controller.signOut(req, res);
        })
        .post('/register', (req, res) => {
            return controller.signUp(req, res);
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true,
        }))
        .post('/updateuser', (req, res) => {
            return controller.update(req, res);
        })
        .post('/add', (req, res) => {
            return controller.add(req, res);
        });

    app.use(router);
};

module.exports = { attachTo };