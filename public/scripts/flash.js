const closeFlashMessage = (className) => {
  const flash = document.getElementsByClassName(className)[0];
  flash.style.display = 'none';
}