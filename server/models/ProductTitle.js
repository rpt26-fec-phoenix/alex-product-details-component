const mongoose = require('mongoose');
require('dotenv').config();

const productTitleDB = `${process.env.DB_LOCAL}/productTitle`;
mongoose.connect(productTitleDB, { useNewUrlParser: true, useUnifiedTopology: true });

const productTitleSchema = new mongoose.Schema({
  'listingId': Number,
  'productListingTitle': String
});

const ProductTitle = mongoose.model('ProductTitle', productTitleSchema);

if (!ProductTitle) {

  const productTitleWords = process.env.PRODUCT_TITLE_WORDS.split(' ');


  const getRandomInclusiveIntervals = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomWordGenerator = (arr) => {
    let chosenIndexes = {};
    let randomIndex = getRandomInclusiveIntervals(0, arr.length - 1);
    while (chosenIndexes.randomIndex) {
      randomIndex = getRandomInclusiveIntervals(0, arr.length - 1);
    }

    chosenIndexes.randomIndex = randomIndex;
    let randomWord = arr[randomIndex];
    return randomWord;
  };

  const makeTitleCase = (string) => {
    let splitString = [...string];
    splitString[0] = splitString[0].toUpperCase();
    return splitString.join('');
  };

  for (let i = 0; i < 100; i++) {

    let productListingTitle = [];
    let wordCount = 0;

    while (wordCount < 10) {
      productListingTitle.push(makeTitleCase(randomWordGenerator(productTitleWords).toLowerCase()));
      wordCount++;
    }

    productListingTitle = productListingTitle.join(' ');

    let newListing = new ProductTitle({
      productListingTitle,
      'listingId': i + 1
    });


    newListing.save()
      .then(response => console.log(`created new listing: ${response}`))
      .catch(err => console.log(`error creating new listing: ${err}`));

  }
}



const getProductTitleByListingId = (listingId) => {
  return new Promise((resolve, reject) => {
    ProductTitle.find({ listingId: listingId }, (err, results) => {
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