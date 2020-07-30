// import autocomplete from './modules/autocomplete';

function autocomplete(input) {
  console.log('Hello');
  const dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener(dropdown, 'place_changed', () => {
    const place = dropdown.getPlace();
    console.log(place);
  });
  if (!input) return;

  Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn);
  };
  
  NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line
  
  NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
    this.forEach((elem) => {
      elem.on(name, fn);
    });
  };
  input.on('keydown', (e) => {
    if (e.keyCode === 13) e.preventDefault();
  });
}
var $ = document.querySelector.bind(document);
autocomplete($('#address'));