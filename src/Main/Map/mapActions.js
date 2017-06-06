export const centerLocation = (coordinates) => {
  return {
    type: 'SET_CENTER',
    centerLocation: coordinates
  };
};

export const userLocation = (userCoordinates) => {
  return {
    type: 'UPDATE_USER_LOCATION',
    userLocation: userCoordinates
  }
}
