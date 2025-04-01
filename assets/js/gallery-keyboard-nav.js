document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    // test if northstar gallery is showing
    let rect =
        document.getElementById('ns-gallery-image').getBoundingClientRect();
    if ((rect.top > 0 && rect.top < window.innerHeight) ||
        (rect.bottom > 0 && rect.bottom < window.innerHeight)) {
      // gallery is showing, command is valid
      if (event.key === 'ArrowRight') {
        incrementImageNS();
      } else {
        decrementImageNS();
      }
      return  // skip testing earthseed gallery
    }

    // test if earthseed gallery is showing
    rect = document.getElementById('es-gallery-image').getBoundingClientRect();
    if ((rect.top > 0 && rect.top < window.innerHeight) ||
        (rect.bottom > 0 && rect.bottom < window.innerHeight)) {
      // gallery is showing, command is valid
      if (event.key === 'ArrowRight') {
        incrementImageES();
      } else {
        decrementImageES();
      }
    }
  }
});