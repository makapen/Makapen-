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
    var $logo = $('#logo');
    var $nav_bar = $('#nav-bar');
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');
    $logo.waypoint({
      offset: function() {
        return -$nav_bar.height();
      },
      handler: function(direction) {
        if (direction === "down") {
          $nav_ham.addClass('nav-ham__icon--sticky');
        }
        // Close the drawer if it's open and your moving up
        else if (direction === "up" && $nav_drawer.hasClass('nav-drawer--active')) {
          $nav_ham.removeClass('nav-ham__icon--sticky');
          $nav_drawer.removeClass('nav-drawer--active');
        }
        // Scrolled up
        else {
          $nav_ham.removeClass('nav-ham__icon--sticky');
        }
      }
    });
  };

  fn.drawer = function() {
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');

    $nav_ham.on('click', function(e) {
        if ($nav_drawer.hasClass('nav-drawer--active')) {
          $nav_drawer.removeClass('nav-drawer--active');
        }
        else {
          $nav_drawer.addClass('nav-drawer--active');
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
