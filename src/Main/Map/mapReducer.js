const initialState = {
  coords: {
    lat: 24.8615,
    lng: 67.0099
  }
};

export default function centerLocation(state=initialState, action) {
  if (action.type === 'SET_CENTER') {
    console.log('action === ', action.centerLocation)
    return Object.assign({}, state, {
      coords: {
        lat: action.centerLocation.coords.lat,
        lng: action.centerLocation.coords.lng
      }
    });
  }
  return state;
};
