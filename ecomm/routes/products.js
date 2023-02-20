/** Products Display Page
 * Display all the listed products on the base url ('/')
 * All products can be viewed without signing in. Hence, the file is outside admin dir.
 * Since, user is not required to be an admin.
 */

const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

module.exports = router;