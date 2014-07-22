$(document).ready(function() {
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
          $('.nav-drawer').removeClass('nav-drawer--active');
          $('.nav-ham__icon').removeClass('nav-ham__icon--open');
          return false;
        }
      }
    });
  };

  // Show nav icons using waypoints
  fn.nav = function() {
    var $logo = $('#logo');
    var $nav_bar = $('#nav-bar');
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');
    var $nav_mk = $('.nav-mk__icon');

    // If mobile, show nav icons off the bat
    if (window.innerWidth > 480) {
      $logo.waypoint({
        offset: function() {
          return -$nav_bar.height();
        },
        handler: function(direction) {
          if (direction === "down") {
            $nav_ham.addClass('fade');
            $nav_mk.addClass('fade');
          }
          // Close the drawer if it's open and your moving up
          else if (direction === "up" && $nav_drawer.hasClass('nav-drawer--active')) {
            $nav_ham.removeClass('fade');
            $nav_mk.removeClass('fade');
            $nav_ham.removeClass('nav-ham__icon--open');
            $nav_drawer.removeClass('nav-drawer--active');
          }
          // Scrolled up
          else {
            $nav_ham.removeClass('fade');
            $nav_mk.removeClass('fade');
          }
        }
      });
    }
    else {
      $nav_ham.addClass('fade');
    }
  };

  fn.drawer = function() {
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');
    var $nav_wrap = $('.nav-ham__wrapper');

    $nav_wrap.on('click', $nav_ham, function(e) {
      e.preventDefault();
      $nav_ham.toggleClass('nav-ham__icon--open');
      $nav_drawer.toggleClass('nav-drawer--active');
    });
  };
  fn.init = function() {
    fn.scroll();
    fn.nav();
    fn.drawer();
  };

  fn.init();
});
