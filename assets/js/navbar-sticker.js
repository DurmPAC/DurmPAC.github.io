window.onscroll = function() {sticker()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function sticker() {
  if (window.pageYOffset >= sticky) {
      document.getElementById("navbar-twizzler").style.paddingLeft=navbar.clientWidth;
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}