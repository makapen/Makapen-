$(function() {
  function scroll() {
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
  }

  var logoMain = $('services');
  var navBar = document.getElementById('nav-bar');
  var navIcon = document.getElementById('nav-icon');

  logoMain.waypoint(function() {
    navBar.style.display = "none";
    navIcon.style.display = "block";
    console.log('ran')
  }, {offset: 1000});

  scroll();
});
