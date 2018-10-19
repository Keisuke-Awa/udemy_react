import axios from 'axios';

const GEOCODE_ENDPOINT = 'http://maps.googleapis.com/maps/api/geocode/json';

export const geocode = place =>
  axios
    .get(GEOCODE_ENDPOINT, { params: { address: place } })
    // .then((results) => {
    //   const { data } = results.data;
    //   const { status } = data.status;

    //   const result = results.data.results[0];
    //   if (typeof result === 'undefined') {
    //     return { status };
    //   }
    //   // const address = result.formatted_address;
    //   // const { location } = result.geometry.location;
    // });
    .then(() => (
      {
        status: 'OK',
        address: '日本、〒105-0011 東京都港区芝公園4丁目2-8',
        location: {
          lat: 35.6585805,
          lng: 139.7454329,
        },
      }));

export const reverseGeocode = () => null;
