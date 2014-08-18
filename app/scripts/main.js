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
          var time_delay = 450;

          if (direction === "down") {
            $nav_ham.addClass('fade-in');
            $nav_mk.addClass('fade-in');
            $nav_bar.addClass('fade-out');
          }
          // Close the drawer if it's open and your moving up
          else if (direction === "up" && $nav_drawer.hasClass('nav-drawer--active')) {
            $nav_ham.removeClass('fade-in');
            $nav_mk.removeClass('fade-in');
            $nav_ham.removeClass('nav-ham__icon--open');
            $nav_drawer.removeClass('nav-drawer--active');
            setTimeout(function() {
              $nav_bar.removeClass('fade-out').delay(3000);
            }, time_delay);
          }
          // Scrolled up
          else {
            $nav_ham.removeClass('fade-in');
            $nav_mk.removeClass('fade-in');
            setTimeout(function() {
              $nav_bar.removeClass('fade-out').delay(3000);
            }, time_delay);
          }
        }
      });
    }
    else {
      $nav_ham.addClass('fade-in');
    }
  };

  fn.drawer = function() {
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');
    var $nav_wrap = $('.nav-ham__wrapper');
    var $nav_anchor = $('.nav-mk__icon').parent();

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
