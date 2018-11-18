function initCropper(imgInput, options){
  var viewportWidth = 400;
  var viewportHeight = 200;
  var resetBtnId,
      wrapperCropperId,
      getCroppedImageId,
      inputId,
      uploadWrapClass,
      uploadMsgClass,
      getImageClass,
      enableResize,
      enableOrientation,
      initialZoom;

  if (typeof(options) !== 'undefined') {
      viewportWidth = options.width;
      viewportHeight = options.height;
      enableResize      = options.enableResize || false;
      enableOrientation = options.enableOrientation || false;
      boundaryWidth  = options.boundaryWidth || 600;
      boundaryHeight = options.boundaryWidth || 400;
      resetBtnId = options.resetBtnId || 'resetCroppedImg';
      wrapperCropperId = options.wrapperCropperId || 'main-cropper';
      getCroppedImageId = options.getCroppedImageId || 'getCroppedImage';
      inputId = options.inputId || 'news-img';
      uploadWrapClass = options.uploadWrapClass || 'upload-wrap';
      uploadMsgClass = options.uploadMsgClass || 'upload-msg';
      getImageClass = options.getImageClass || 'get-image';
      initialZoom = options.initialZoom || false;
  }

  $('#' + resetBtnId ).on('click', function(e) {
    e.preventDefault();
    resetCropperMsg();
  });

  var el = document.getElementById(wrapperCropperId);
  var options_crropper = {
    enableResize: enableResize,
    enableOrientation: enableOrientation,
    viewport: {
      width: viewportWidth,
      height: viewportHeight
    },
    boundary: {
      width: boundaryWidth,
      height: boundaryHeight
    }
  };
  var cropper = new Croppie(el, options_crropper);

  $('#' + getCroppedImageId).on('click', function() {
    var imageFormat = 'png';
    if(/.jpg|.jpeg$/.test($('#' + inputId).val().toLowerCase())) {
      imageFormat = 'jpeg';
    }
    cropper.result({
      type: 'base64',
      size: 'original',
      format: imageFormat,
      quality: 0.7
    })
    .then(function(croppedImgData) {
      $(imgInput).val(croppedImgData);
      var img = $('<img>');
      img.addClass('img-responsive').attr('src', croppedImgData);
      $('.' + uploadMsgClass).html(img);
      var removeBtn = $('<a></a>');
      removeBtn.text('Скинути')
        .attr('href', '#').attr('id', resetBtnId)
        .addClass('btn btn-default mt10')
        .on('click', function(e) {
          e.preventDefault();
          resetCropperMsg();
      });
      $('.' + uploadMsgClass).append(removeBtn);
      if ($('.' + uploadMsgClass).is(':hidden')) {
        $('.' + uploadMsgClass + ', .' + uploadWrapClass + ', .' + getImageClass).toggle('show');
      }
    }).then(function(data){
      cropper.destroy();
      cropper = new Croppie(el, options_crropper);
    });
  });

  $('#' + inputId).on('change', function () {
    if(!/.png|.jpg|.jpeg|.gif$/.test($('#' + inputId).val().toLowerCase())) {
      $('.' + uploadMsgClass).parent().prepend('<div class="incorrect-format alert alert-warning">Не вірний формат</div>');
      setTimeout(function(){
        $('.incorrect-format.alert.alert-warning').remove();
      }, 1000);
      return false;
    }
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        cropper.bind({
          url: e.target.result
        }).then(function() {
          if (initialZoom !== false) {
            cropper.setZoom(parseFloat(initialZoom));
          }
        });
      };
      reader.readAsDataURL(this.files[0]);
      if ($('.' + uploadMsgClass).is(':visible')) {
        $('.' + uploadMsgClass + ', .' + uploadWrapClass + ', .' + getImageClass).toggle('show');
      }
    }
  });
  function resetCropperMsg() {
    $('#' + inputId).val('');
    $('.' + uploadMsgClass).html('Upload a file to start cropping');
    $(imgInput).val('destroy');
  }
}
