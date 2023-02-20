/** middlewares.js
 * Frequently used middlewares to handle requests and errord efficiently.
 */
const { validationResult } = require('express-validator');


module.exports = {
    /** handleErrors
     * Args:
     * templateFunc -> A function which returns a template after receieving errors
     * i.e. Reload back to signin template whenever signin errors found.
     * dataCB -> DataCallBack Optional parameter to pass in data to the templates for predefined values.
     * i.e. Products data in Edit Form.
     */
    handleErrors (templateFunc, dataCb) {
        return async (req,res,next) => {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()) {
                let data = {};
                if(dataCb){
                    data = await dataCb(req)
                }

                return res.send(templateFunc({errors, ...data}))
            }
            
            // Everything works correctly, Onto the next middleware function if any
            next()
        }
    },
    /** requireAuth
     * Checks if the user is signed in.
     * Only then gives access to the desired pages.
     * i.e. Products Create, Update, Delete pages.
     */
    requireAuth(req,res,next) {
        if(!req.session.userId) {
            return res.redirect('/signin')
        }

        // Everything works correctly, Onto the next middleware function if any
        next();
    }
}