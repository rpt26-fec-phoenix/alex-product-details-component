const mongoose = require('mongoose');
require('dotenv').config();

const productTitleDB = `${process.env.DB_LOCAL}/productTitle`;
mongoose.connect(productTitleDB, {useNewUrlParser: true, useUnifiedTopology: true});

const productTitleSchema = new mongoose.Schema({
  'listingId': Number,
  'productListingTitle': String
});

const ProductTitle = mongoose.model('ProductTitle', productTitleSchema);

ProductTitle.remove({}, () => console.log('cleared all rows in Product Title db'));


const productTitleWords = process.env.PRODUCT_TITLE_WORDS.split(' ');
console.log(`product title words split: ${JSON.stringify(productTitleWords)}`);

let newListing = new ProductTitle({
  'listingId': 1,
  'productListingTitle': 'Guesthouse Great Ocean & Mountain Views near Beach'
});


newListing.save()
  .then(response => console.log(`created new listing: ${response}`))
  .catch(err => console.log(`error creating new listing: ${err}`));

const getProductTitleByListingId = (listingId) => {
  return new Promise ((resolve, reject) => {
    ProductTitle.find({ listingId: listingId}, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getProductTitleByListingId
};