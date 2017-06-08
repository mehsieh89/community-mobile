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

export const disableButton = (data) => {
  return {
    type: 'DISABLE_BUTTON',
    payload: data
  };
};
