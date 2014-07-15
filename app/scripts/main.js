$(function() {
  'use strict';

  var fn = fn || {};

  fn.scroll = function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  };

  fn.nav = function() {
    var logoMain = $('#services');
    var nav_bar = document.querySelector('#nav-bar');
    var nav_icon = document.querySelectorAll('.nav-icon__content')[0];

    $('#services').waypoint({
      handler: function(direction) {
        if (direction === "down") {
          console.log('removed nav bar');
          nav_icon.style.position = "relative";
          nav_icon.style.top = '20px !important';
          nav_icon.style.right = '20px !important';
        }
        if (direction === "up") {
          console.log('added nav bar');
        }
      }
    });
  };

  fn.init = function() {
    fn.scroll();
    fn.nav();
  };

  fn.init();
});
