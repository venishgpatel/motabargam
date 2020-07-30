function autocomplete(input) {
  console.log('Hello');
  const dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener(dropdown, 'place_changed', () => {
    const place = dropdown.getPlace();
    console.log(place);
  });
  if (!input) return;
  input.on('keydown', (e) => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;