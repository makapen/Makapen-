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
    var nav_bar = $('#nav-bar');
    var nav_icon = $('.nav-icon__image');

    logoMain.waypoint({
      offset: '40%',
      handler: function(direction) {
        if (direction === "down") {
          console.log('removed nav bar');
          // nav_bar.css({ height: nav_icon.outerHeight()});
          nav_icon.addClass('sticky');
        }
        if (direction === "up") {
          console.log('added nav bar');
          nav_icon.removeClass('sticky');
        }
      }
    });
  };

  fn.drawer = function() {
    var nav_icon = $('.nav-icon__image');
    var nav_drawer = $('.nav-icon__drawer');
    nav_icon.on('click', function(e) {
      console.log('drawer hit');
      if (nav_drawer.hasClass('nav-icon__drawer-active')) {
        nav_drawer.removeClass('nav-icon__drawer-active');
      }
      else {
        nav_drawer.addClass('nav-icon__drawer-active');
      }
    });
  };

  fn.init = function() {
    fn.scroll();
    fn.nav();
    fn.drawer();
  };

  fn.init();
});
