import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      avgReviews: 4.8,
      totalReviews: 122,
      location: 'Mountain View, California, United States',
      isSuperhost: true,
    };
  }

  componentDidMount() {
    let productId = window.location.pathname.split('/')[1];

    axios.get(`/productListingTitle/${productId}`).then((response) => {
      console.log(response);
      this.setState({
        title: response.data.productListingTitle,
      });
    });
  }
  render() {
    const {
      title,
      avgReviews,
      totalReviews,
      location,
      isSuperhost,
    } = this.state;
    return (
      <div id="wrapper">
        <div id="container">
          <div id="component-container">
            <div id="title--main">
              <h1>{title}</h1>
            </div>
            <div id="title--info">
              <div id="title--info--description">
                <div className="description-individuals" id="avgReviews">
                  {avgReviews}
                </div>
                <div className="description-individuals" id="totalReviews">
                  ({totalReviews})
                </div>
                <div className="description-individuals" id="superhost">
                  {!isSuperhost ? '' : 'Superhost'}
                </div>
                <div className="description-individuals" id="product-location">
                  {location}
                </div>
              </div>
              <div id="title--info--buttons">
                <div id="title-share">share</div>
                <div id="title-save">save</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('product-main-title'));
