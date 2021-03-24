/* ===================================================================
 * Registration JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";


    /* Registration Form
        * ------------------------------------------------------ */
    var clRegistrationForm = function () {

        /* local validation */
        $('#registrationForm').validate({
            rules: {
                username: {
                    required: true,
                    minlength: 3,
                    maxlength: 50
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 20
                },
                terms: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: "come on, you need an account, don't you?",
                    minlength: "your username must consist of at least 3 characters",
                    maxlength: "your username must not exeed 50 characters limit"
                },
                password: {
                    required: "no password, no account, that's it",
                    minlength: "your password must consist of at least 6 characters",
                    maxlength: "your password must not exeed 20 characters limit"
                },
                terms: {
                    required: "um..., you have to agree to the terms and conditions to continue"
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
    clRegistrationForm();
})(jQuery);