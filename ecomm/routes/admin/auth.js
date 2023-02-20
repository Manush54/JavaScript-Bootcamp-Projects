/** auth.js
 * Handles routing of all get and post requests for users
 * i.e. Signup, signin, signout requests
 */
const express = require('express');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser
} = require('./validators');
const { handleErrors } = require('./middlewares');

const router = express.Router();

// Signup request
router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

// Create new user request
router.post(
    '/signup', 
    [   requireEmail, 
        requirePassword, 
        requirePasswordConfirmation
    ], 
    handleErrors(signupTemplate),
    async (req,res) => {
        const { email, password } = req.body;

        // Create a user in our user repo to represent this person
        const user = await usersRepo.create( {email, password} )

        // Store the id of our user repo to represent this person
        req.session.userId = user.id     // Added by cookie session

        res.redirect('/admin/products')
})

// Signout request
router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out.')
})

// Signin page
router.get('/signin', (req,res) => {
    res.send(signinTemplate({req}))
})

// Signin valid user
router.post(
    '/signin',
    [requireEmailExists, requireValidPasswordForUser], 
    handleErrors(signinTemplate),
    async (req,res) => {
    const {email} = req.body;

    const user = await usersRepo.getOneBy({ email });
    req.session.userId = user.id;

    res.redirect('/admin/products')
})

module.exports = router;