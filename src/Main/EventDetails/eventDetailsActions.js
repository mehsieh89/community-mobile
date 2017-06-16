export const setCurrentEvent = (index) => {
  return {
    type: 'SET_CURRENT_EVENT',
    payload: index
  };
};

export const setCurrentEventParticipants = (data) => {
  return {
    type: 'SET_CURRENT_EVENT_PARTICIPANTS',
    payload: data
  };
};

export const updateButton = (data) => {
  return {
    type: 'UPDATE_BUTTON',
    payload: data
  };
};
