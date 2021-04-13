import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      avgReviews: 4.8,
      totalReviews: 122,
      location: 'Mountain View, California, United States',
      isSuperhost: true,
    }
  }

  componentDidMount() {
    let productId = window.location.pathname.split('/')[1];

    axios.get(`/productListingTitle/${productId}`)
      .then( response => {
        console.log(response)
        this.setState({
          title: response.data.productListingTitle
        })
      })
  }
  render() {
    const { title, avgReviews, totalReviews, location, isSuperhost } = this.state;
    return(
      <div>
        {title}
        <br />
        {avgReviews} ({totalReviews})
        -
        {!isSuperhost ? '' : 'Superhost'}
        -
        {location}
        <div>
          <div>
            share
          </div>
          <div>
            save
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('product-main-title'))