export const toggleEventDetails = () => {
  return {
    type: 'TOGGLE_EVENT_DETAILS',
  };
};

export const setCurrentEvent = (index) => {
  return {
    type: 'SET_CURRENT_EVENT',
    payload: index
  };
};
