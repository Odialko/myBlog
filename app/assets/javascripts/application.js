// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require dropzone
//= require comments
//= require_tree .

function initButtonChoose(input_id, noFile_id) {
    $(input_id).bind('change', function () {
        var filename = $(input_id).val();
        if (filename == null) {
            // $(file_upload).removeClass('active');
            $(noFile_id).text("Файл не обрано...");
        }
        else {
            // $(file_upload).addClass('active');
            $(noFile_id).text(filename.replace("C:\\fakepath\\", "").substr(0, 20) + '...');
        }
    });
}
