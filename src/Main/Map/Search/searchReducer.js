export default function toggleSearchBar(state=false, action) {
  if (action.type === 'TOGGLE_SEARCH_BAR') {
    return !state;
  }
  return state;
}
