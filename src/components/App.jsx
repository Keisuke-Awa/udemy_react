import React, { Component } from 'react';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

class App extends Component {
  // 複数使いたい場合はstateを共通の親に持たせる。単独で必要な場合はそれ自体のコンポーネントを持たせる。
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
    };
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

  handlePlaceSubmit(place) {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('結果が見つからないよ');
            break;
          }
          default: {
            this.setErrorMessage('エラーが発生しました');
            break;
          }
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels });
      })
      .catch(() => {
        this.setErrorMessage('通信エラーが発生しました');
      });
  }

  // クラスコンポーネントはrenderで返す
  render() {
    return (
      <div className="app">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>ホテル検索結果</h2>
            <HotelsTable hotels={this.state.hotels} />
          </div>
        </div>
      </div>
    );
  }
}

// setStateはstateを更新し、renderを再度呼ぶ機能をもつ
// ツーウェイバインディング
export default App;