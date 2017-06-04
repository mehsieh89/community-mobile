export const toggleSearchBar = () => {
 return {
   type: 'TOGGLE_SEARCH_BAR'
 };
};

// export const handleLocationInput = (location) => {
//   const string = location.split(' ').join('+');
//   axios.post('http://localhost:3000/api/locationInput', {location: string})
//   .then((data) => {
//
//   })
//
// }
