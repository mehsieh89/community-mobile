export const toggleSearchBar = () => {
 return {
   type: 'TOGGLE_SEARCH_BAR'
 };
};

// export const handleLocationInput = (location) => {
//   const string = location.split(' ').join('+');
//   axios.post('https://warriors-community.herokuapp.com/api/locationInput', {location: string})
//   .then((data) => {
//
//   })
//
// }
