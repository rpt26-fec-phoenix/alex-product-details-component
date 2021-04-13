const express = require('express');
const productTitleDB = require('./models/ProductTitle');
const path = require('path')

const app = express();

app.use('/:productId', express.static(path.join(__dirname, '../public')));

app.get('/productListingTitle/:productId', (req, res) => {
  productTitleDB.getProductTitleByListingId(req.params.productId)
    .then(results => res.json(results[0]))
    .catch(err => res.send(err));

});


app.listen(3000, () => console.log('connected to server'));

