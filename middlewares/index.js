const urlMiddleware = require('./urlMiddleware');
const authMiddleware = require('./authMiddleware');
const postProductMiddleware = require('./postProductMiddleware');
const priceMiddleware = require('./priceMiddleware');
const putProductMiddleware = require('./putProductMiddleware');

module.exports = {
    urlMiddleware,
    authMiddleware,
    postProductMiddleware,
    priceMiddleware,
    putProductMiddleware
}
