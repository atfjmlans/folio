/* ===================================================================
 * Contact JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";


    /* Contact Form
        * ------------------------------------------------------ */
    var clContactForm = function () {

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
                    maxlength: 50
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
                    maxlength: "your subject must not exeed 50 characters limit"
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
            submitHandler: function (form) {

                var sLoader = $('.submit-loader');
                var formUrl = $(form).attr('action');
                var formData = $(form).serialize();

                $.ajax({

                    type: "POST",
                    url: formUrl,
                    data: formData,
                    beforeSend: function () {

                        sLoader.slideDown("slow");

                    },
                    success: function (response) {

                        // Message was sent
                        if (response.status == 200) {
                            form.reset();
                            sLoader.slideUp("slow");
                            $('.message-success').html(response.message);
                            $('.message-success').slideDown("slow");
                            $('.message-success').fadeOut(5000);
                        }

                    },
                    error: function () {

                        sLoader.slideUp("slow");
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");
                        $('.message-warning').fadeOut(5000);

                    }

                });
            }

        });
    };
    clContactForm()
})(jQuery);