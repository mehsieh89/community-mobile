const initialState = {
  allEvents: []
};

export default function(state=initialState, action) {
  if (action.type === 'ADD_EVENTS') {
    return Object.assign({}, state, {
      allEvents: action.addEvents
    });
  }
  return state;
};
