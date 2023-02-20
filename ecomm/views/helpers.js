module.exports =  { getError (errors, prop) {
        // prop === 'email' || 'password' || 'passwordConfirmation'
        try {
            return errors.mapped()[prop].msg

            /**errors.mapped() === {
             *  email : {
             *   msg: 'Invalid Email'
             *  },
             *  password : {
             *   msg: 'Password too short' 
             *  },
             *   paswwordConfirmation : {
             *   msg: 'Passwords must match 
             *  }
             * } 
             * */
        } catch(err) {
            return '';
        }
    }
}