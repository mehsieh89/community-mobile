export default function toggleCreateEvent(state=false, action) {
  // state = {username: 'hello', location: 'world'}
  // action = {type: 'setLocation', location: 'HR'}
  // {username: undefined, location: 'world'}
  if (action.type === 'TOGGLE_CREATE_EVENT') {
    return !state;
  }
  return state;
}
