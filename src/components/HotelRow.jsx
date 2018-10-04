import React from 'react';
import PropTypes from 'prop-types';


const HotelRow = ({ hotel }) => (
  <tr>
    <td><img src={hotel.thumbUrl} alt={hotel.name} /></td>
    <td><a href={hotel.url} target="_blank" rel="noopener noreferrer">{hotel.name}</a></td>
    <td>{hotel.price}円</td>
    <td>{hotel.reviewAverage}</td>
    <td>{hotel.reviewCount}</td>
  </tr>
);

HotelRow.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
    thumbUrl: PropTypes.string,
    price: PropTypes.string,
    reviewAverage: PropTypes.number,
    reviewCount: PropTypes.number,
    distance: PropTypes.number,
  }).isRequired,
};

export default HotelRow;