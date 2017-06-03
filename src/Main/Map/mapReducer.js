const initialState = {
  coords: {
    lat: 37.78825,
    lng: -122.4324
  }
};

export default function centerLocation(state=initialState, action) {
  if (action.type === 'SET_CENTER') {
    console.log('getting inside set center')
    return Object.assign({}, state, {
      centerLocation: action.centerLocation
    });
  }
  return state;
};
