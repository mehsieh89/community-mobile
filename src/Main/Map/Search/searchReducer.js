export default function toggleSearchBar(state=false, action) {
  // state = {username: 'hello', location: 'world'}
  // action = {type: 'setLocation', location: 'HR'}
  // {username: undefined, location: 'world'}
  if (action.type === 'TOGGLE_SEARCH_BAR') {
    return !state;
  }
  return state;
}
