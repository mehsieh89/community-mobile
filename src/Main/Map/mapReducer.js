const initialState = {
  coords: {
    lat: 24.8615,
    lng: 67.0099
  },
  userCoords: {
    lat: 24.8615,
    lng: 67.0099
  }
};

export default function(state=initialState, action) {
  if (action.type === 'SET_CENTER') {
    return Object.assign({}, state, {
      coords: {
        lat: action.centerLocation.coords.lat,
        lng: action.centerLocation.coords.lng
      }
    });
  }

  if (action.type === 'UPDATE_USER_LOCATION') {
    return Object.assign({}, state, {
      userCoords: {
        lat: action.userLocation.coords.lat,
        lng: action.userLocation.coords.lng
      }
    });
  }

  return state;
};
