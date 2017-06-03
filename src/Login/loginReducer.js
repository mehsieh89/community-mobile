const initialState = {
  id: null,
  first: '',
  last: '',
  display: '',
  email: '',
  phone: null,
  created_at: null,
  updated_at: null
};

export default function updateCurrrentUser(state=initialState, action) {
  // state = {username: 'hello', location: 'world'}
  // action = {type: 'setLocation', location: 'HR'}
  // {username: undefined, location: 'world'}
  if (action.type === 'UPDATE_CURRENT_USER') {
    let newState = Object.assign({}, action.payload);
    return newState;
  }
  return state;
}
