import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from '../containers/SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
// import HotelsTable from './HotelsTable';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  // 複数使いたい場合はstateを共通の親に持たせる。単独で必要な場合はそれ自体のコンポーネントを持たせる。
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'price',
    };
  }

  // subscribe/unsubscribe周りがよくわからん
  componentDidMount() {
    // const place = this.getPlaceParam();
    // if (place) {
    //   this.startSearch(place);
    // }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const { place } = params;
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  // handlePlaceSubmit(e) {
  //   e.preventDefault();
  //   this.props.history.push(`/?place=${this.state.place}`);
  //   this.startSearch();
  // }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, this.state.sortKey),
    });
  }

  // クラスコンポーネントはrenderで返す
  render() {
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm />
        <div className="result-area">
          <Map location={this.props.geocodeResult.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.props.geocodeResult.address}
              location={this.props.geocodeResult.location}
            />
            {/*
              <h2>ホテル検索結果</h2>
              <HotelsTable
                hotels={this.state.hotels}
                sortKey={this.state.sortKey}
                onSort={sortKey => this.handleSortKeyChange(sortKey)}
              />
            */}
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  geocodeResult: state.geocodeResult,
});

export default connect(mapStateToProps)(SearchPage);
