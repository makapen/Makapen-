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

  // Show nav icons using waypoints
  fn.nav = function() {
    var $logo = $('#logo');
    var $nav_bar = $('#nav-bar');
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');
    var $nav_mk = $('.nav-mk__icon');

    // If mobile, show nav icons off the bat, hack
    if (window.innerWidth > 480) {
      $logo.waypoint({
        offset: function() {
          return -$nav_bar.height();
        },
        handler: function(direction) {
          if (direction === "down") {
            $nav_ham.addClass('nav-ham__icon--sticky');
            $nav_mk.addClass('nav-mk__icon--sticky');
            // $nav_bar.css('visibility', 'hidden');
          }
          // Close the drawer if it's open and your moving up
          else if (direction === "up" && $nav_drawer.hasClass('nav-drawer--active')) {
            $nav_ham.removeClass('nav-ham__icon--sticky');
            $nav_mk.removeClass('nav-mk__icon--sticky');
            $nav_ham.removeClass('nav-ham__icon--open');
            $nav_drawer.removeClass('nav-drawer--active');
            // $nav_bar.css('visibility', 'visible');
          }
          // Scrolled up
          else {
            $nav_ham.removeClass('nav-ham__icon--sticky');
            $nav_mk.removeClass('nav-mk__icon--sticky');
            // $nav_bar.css('visibility', 'visible');
          }
        }
      });
    }
    else {
      $nav_ham.addClass('nav-ham__icon--sticky');
    }
  };

  fn.drawer = function() {
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');

    $nav_ham.on('click', function(e) {
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
