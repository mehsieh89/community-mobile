const initialState = { visible: false };

export default function(state=initialState, action) {
  if (action.type === 'TOGGLE_UP_DRAWER') {
    return Object.assign({}, state, { visible: !state.visible });
  }

  return state;
};
