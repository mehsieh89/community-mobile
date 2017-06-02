const updateCurrentUser = (userData) => {
  return {
    type: 'UPDATE_CURRENT_USER',
    payload: userData
  };
};

export default updateCurrentUser;
