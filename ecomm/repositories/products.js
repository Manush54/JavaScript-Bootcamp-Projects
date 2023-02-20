/** products.js
 * Create a new class for Product Repository
 * Which extends the Repository Class
 * Returns a new object with the file name 'products.json'
 * to store all the products related data in a single file.
 */
const Repository = require('./repository');

class ProductsRepository extends Repository {}

module.exports = new ProductsRepository('products.json');