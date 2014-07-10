(function () {
  'use strict';

  function nav_disappear() {
    var screen_location = window.screenTop;
    var window_height = window.innerHeight;
    var nav = document.querySelector('nav-bar');
    if (screen_location > window_height) {
      nav.style.display = "none";
      alert('something');
    }
  }

  window.addEventListener('scroll', nav_disappear);
})();
