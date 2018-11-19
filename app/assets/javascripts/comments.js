(function() {
    jQuery(function() {
        return $(".comment-form").on("ajax:beforeSend", function(evt, xhr, settings) {
            return $(this).find('textarea').addClass('uneditable-input').attr('disabled', 'disabled');
        }).on("ajax:success", function(evt, data, status, xhr) {
            $(this).find('textarea').removeClass('uneditable-input').removeAttr('disabled', 'disabled').val('');
            return $(xhr.responseText).hide().insertAfter($(this)).show('slow');
        });
    });

}).call(this);

(function() {
    jQuery(function() {
        return $(document).on("ajax:beforeSend", ".comment", function() {
            return $(this).fadeTo('fast', 0.5);
        }).on("ajax:success", ".comment", function() {
            return $(this).hide('fast');
        }).on("ajax:error", ".comment", function() {
            return $(this).fadeTo('fast', 1);
        });
    });

}).call(this);
