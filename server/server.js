const express = require('express');
const productTitleDB = require('./models/ProductTitle');

const app = express();

app.get('/', (req, res) => {
  res.send('hello logged on');
});

app.get('/productListingTitle/:productId', (req, res) => {
  productTitleDB.getProductTitleByListingId(req.params.productId)
    .then(results => res.send(results))
    .catch(err => res.send(err));

});


app.listen(3000, () => console.log('connected to server'));