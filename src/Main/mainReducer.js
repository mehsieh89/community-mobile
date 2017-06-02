export default function (state = { allEvents: [] }, action) {
  if (action.type === 'ADD_EVENTS') {
    return Object.assign({}, state, {
      allEvents: action.addEvents
    });
  }
  return state;
}
