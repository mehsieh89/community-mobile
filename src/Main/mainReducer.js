export default function greetUser(state={username: 'Hack Reactor'}, action) {
  // state = {username: 'hello', location: 'world'}
  // action = {type: 'setLocation', location: 'HR'}
  // {username: undefined, location: 'world'}
  if (action.type === 'SET_USERNAME') {
    return Object.assign({}, state, {
      username: action.username
    });
  }
  return state;
}
