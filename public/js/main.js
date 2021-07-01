/* ===================================================================
 * Glint - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var clPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };


    /* Niceccroll
    * -------------------------------------------------- */
    function IEVersion() { //Check IE11
        if (!!navigator.userAgent.match(/Trident\/7\./)) {
            return 11;
        }
    }

    if (IEVersion() != 11) {
        var clNiceScroll = function(){
            var niceScroll = $("body").niceScroll({
                cursorcolor: "#111111",
                zindex: '99999',
                cursorminheight: 60,
                scrollspeed: 80,
                cursorwidth: 7,
                autohidemode: false,
                background: "#aaa",
                cursorborder: 'none',
                cursoropacitymax: .7,
                cursorborderradius: 0,
                horizrailenabled: false,
                autohidemode: false,
            });
        };
    }


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var clMenuOnScrolldown = function() {
        
        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var clOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            // menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');	
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                // menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* photoswipe
    * ----------------------------------------------------- */
    var clPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

            // get items
            $folioItems.each( function(i) {

                var $folio = $(this),
                    $thumbLink =  $folio.find('.thumb-link'),
                    $title = $folio.find('.item-folio__title'),
                    $caption = $folio.find('.item-folio__caption'),
                    $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                    $captionText = $.trim($caption.html()),
                    $href = $thumbLink.attr('href'),
                    $size = $thumbLink.data('size').split('x'),
                    $width  = $size[0],
                    $height = $size[1];
         
                var item = {
                    src  : $href,
                    w    : $width,
                    h    : $height
                }

                if ($caption.length > 0) {
                    item.title = $.trim($titleText + $captionText);
                }

                items.push(item);
            });

            // bind click event
            $folioItems.each(function(i) {

                $(this).on('click', function(e) {
                    e.preventDefault();
                    var options = {
                        index: i,
                        showHideOpacity: true
                    }

                    // initialize PhotoSwipe
                    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                });

            });

    };
    

   /* Stat Counter
    * ------------------------------------------------------ */
    var clStatCount = function() {
        
        var statSection = $(".about-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                } 

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };


   /* Masonry
    * ---------------------------------------------------- */ 
    var clMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var clSlickSlider = function() {

        $('.testimonials').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
        
        $('.content').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: true,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    
    };

   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var clSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }
            });
        });

    };



   /* Alert Boxes
    * ------------------------------------------------------ */
    var clAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Subscribe Form
    * ------------------------------------------------------ */
    var clSubscribeForm = function() {
        
        /* local validation */
        $('#subscribeForm').validate({
            rules: {
                subscribeEmail: {
                    required: true,
                    email: true,
                    maxlength: 50
                }
            },
            messages: {
                subscribeEmail: {
                    required: "no email, no message",
                    maxlength: "your email must not exeed 50 characters limit"
                }
            },
        
            /* submit via ajax */
 /*            submitHandler: function(form) {
    
                var sLoader = $('.submit-loader');
                var formUrl = $(form).attr('action');
                var formData = $(form).serialize();
    
                $.ajax({
    
                    type: "POST",
                    url: formUrl,
                    data: formData,
                    beforeSend: function() { 
    
                        sLoader.slideDown("slow");
    
                    },
                    success: function(response) {
    
                        // Message was sent
                        if (response.status == 200) {
                            form.reset();
                            sLoader.slideUp("slow"); 
                            $('.message-success').html(response.message);
                            $('.message-success').slideDown("slow");
                            $('.message-success').fadeOut(3000);
                        }
    
                    },
                    error: function() {
    
                        sLoader.slideUp("slow"); 
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");
                        $('.message-warning').fadeOut(3000);
    
                    }
    
                });
            } */
    
        });
    };



   /* Contact Form
    * ------------------------------------------------------ */
    var clContactForm = function() {
        
        /* local validation */
        $('#contactForm').validate({
            rules: {
                contactName: {
                    required: true,
                    minlength: 3,
                    maxlength: 50
                },
                contactSubject: {
                    required: true,
                    minlength: 5,
                    maxlength: 100
                },
                contactEmail: {
                    required: true,
                    email: true,
                    maxlength: 50
                },
                contactPhone: {
                    required: true,
                    number: true,
                    minlength: 10,
                    maxlength: 15
                },
                contactMessage: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                contactName: {
                    required: "come on, you have a name, don't you?",
                    minlength: "your name must consist of at least 3 characters",
                    maxlength: "your name must not exeed 50 characters limit"
                },
                contactSubject: {
                    required: "psst..., your subject will help me to sort and reply your message faster",
                    minlength: "your subject must consist of at least 5 characters",
                    maxlength: "your subject must not exeed 100 characters limit"
                },
                contactEmail: {
                    required: "no email, no message",
                    maxlength: "your email must not exeed 50 characters limit"
                },
                contactPhone: {
                    required: "ahem..., you want me to reach you, right?",
                    minlength: "your number must consist of at least 10 digit",
                    maxlength: "your number must not exeed 15 digit limit"
                },
                contactMessage: {
                    required: "um..., you have to write something to send this form.",
                    minlength: "thats all? really?",
                    maxlength: "are you sure it is just a message?"
                }
            },
        
            /* submit via ajax */
            submitHandler: function(form) {
    
                var sLoader = $('.submit-loader');
                var formUrl = $(form).attr('action');
                var formData = $(form).serialize();
    
                $.ajax({
    
                    type: "POST",
                    url: formUrl,
                    data: formData,
                    beforeSend: function() { 
    
                        sLoader.slideDown("slow");
    
                    },
                    success: function(response) {
    
                        // Message was sent
                        if (response.status == 200) {
                            form.reset();
                            sLoader.slideUp("slow"); 
                            $('.message-success').html(response.message);
                            $('.message-success').slideDown("slow");
                            $('.message-success').fadeOut(3000);
                        }
    
                    },
                    error: function() {
    
                        sLoader.slideUp("slow"); 
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");
                        $('.message-warning').fadeOut(3000);
    
                    }
    
                });
            }
    
        });
    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var clAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


   /* Back to Top
    * ------------------------------------------------------ */
    var clBackToTop = function() {
        
        var pxShow  = 500,         // height on which the button will show
        fadeInTime  = 400,         // how slow/fast you want the button to show
        fadeOutTime = 400,         // how slow/fast you want the button to hide
        scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $(".go-top")
        
        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        clPreloader();
        clNiceScroll();
        clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clMasonryFolio();
        clSlickSlider();
        clSmoothScroll();
        clAlertBoxes();
        clSubscribeForm();
        clContactForm();
        clAOS();
        clBackToTop();

    })();
        
        
})(jQuery);