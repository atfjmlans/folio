/* ===================================================================
 * Login JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";


    /* Login Form
        * ------------------------------------------------------ */
    var clLoginForm = function () {

        /* local validation */
        $('#loginForm').validate({
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
                }
            },
            messages: {
                username: {
                    required: "ahem..., your username, please?",
                    minlength: "your username must consist of at least 3 characters",
                    maxlength: "your username must not exeed 50 characters limit"
                },
                password: {
                    required: "psst..., you have your password, right?",
                    minlength: "your password must consist of at least 6 characters",
                    maxlength: "your password must not exeed 20 characters limit"
                }
            },

            // /* submit via ajax */
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
                            $('.message-success').html('user-authenticated', response.headers.location);
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
    clLoginForm();
})(jQuery);