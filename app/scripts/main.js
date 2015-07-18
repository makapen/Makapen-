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
  fn.nav = function(elementId) {
    var firstElement = $(elementId);
    var $nav_bar = $('#nav-bar');
    var $nav_ham = $('.nav-ham__icon');
    var $nav_drawer = $('.nav-drawer');
    var $nav_mk = $('.nav-mk__icon');

    // If mobile, show nav icons off the bat
    if (window.innerWidth > 620) {
      if (firstElement) {
        firstElement.waypoint({
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

  fn.slider = function() {
    $('#slider').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      nextArrow: '<button class="slide-arrow--next"><i class="fa fa-4x fa-angle-right"></i></button>',
      prevArrow: '<button class="slide-arrow--prev"><i class="fa fa-4x fa-angle-left"></i></button>'
    });
  };

  // for each new page that has a new element, add a new nav function
  fn.init = function() {
    fn.scroll();
    fn.nav("#philosophy");
    fn.nav("#product");
    fn.nav("#work");
    fn.nav("#about");
    fn.drawer();
    fn.slider();
    FastClick.attach(document.body);

  };

  fn.init();


// Display Portfolio
  $('.whyzer')
  .mouseenter(function() {
    $('.whyzer-hover-project').removeClass('hide');
  })
  .mouseleave(function() {
    $('.whyzer-hover-project').addClass('hide');
  });

  $('.gk')
  .mouseenter(function() {
    $('.gk-hover-project').removeClass('hide');
  })
  .mouseleave(function() {
    $('.gk-hover-project').addClass('hide');
  });

  $('.pawzii')
  .mouseenter(function() {
    $('.pawzii-hover-project').removeClass('hide');
  })
  .mouseleave(function() {
    $('.pawzii-hover-project').addClass('hide');
  });



// Waypoint to trigger Process animation
  var processOneWaypoint = new Waypoint({
    element: $('.process-1'),
    handler: function() {
      // $('.process-1-left').addClass('animated fadeInLeft');
      // $('.process-1-right').addClass('animated fadeInRight');
    }
  })






  // Animate Header w/ animate.css
  jQuery(document).ready(function ($) {
    //set animation timing
    var animationDelay = 2500,
        //loading bar effect
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        lettersDelay = 50,
        //type effect
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        //clip effect
        revealDuration = 600,
        revealAnimationDelay = 1500;

    initHeadline();


    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($('.cd-headline.letters').find('b'));
        //initialise headline animation
        animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
        $words.each(function () {
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (i in letters) {
                if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function () {
            var headline = $(this);

            if (headline.hasClass('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function () {
                    headline.find('.cd-words-wrapper').addClass('is-loading')
                }, barWaiting);
            } else if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10
                    spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type')) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find('.cd-words-wrapper b'),
                    width = 0;
                words.each(function () {
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.cd-words-wrapper').css('width', width);
            };

            //trigger animation
            setTimeout(function () {
                hideWord(headline.find('.is-visible').eq(0))
            }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function () {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function () {
                showWord(nextWord, typeLettersDelay)
            }, typeAnimationDelay);

        } else if ($word.parents('.cd-headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                width: '2px'
            }, revealDuration, function () {
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord)
            }, barAnimationDelay);
            setTimeout(function () {
                $word.parents('.cd-words-wrapper').addClass('is-loading')
            }, barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord)
            }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                'width': $word.width() + 10
            }, revealDuration, function () {
                setTimeout(function () {
                    hideWord($word)
                }, revealAnimationDelay);
            });
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () {
                hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else if ($bool) {
            setTimeout(function () {
                hideWord(takeNext($word))
            }, animationDelay);
        }

        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () {
                showLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else {
            if ($word.parents('.cd-headline').hasClass('type')) {
                setTimeout(function () {
                    $word.parents('.cd-words-wrapper').addClass('waiting');
                }, 200);
            }
            if (!$bool) {
                setTimeout(function () {
                    hideWord($word)
                }, animationDelay)
            }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }
});




});
