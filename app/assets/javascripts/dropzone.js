function initDropzone(options){
  var container = options.container
  Dropzone.autoDiscover = false;
  var token = $('meta[name="csrf-token"]').attr('content');

  dropzonesExsists = ($(container).length);
  if (dropzonesExsists) {

    var galleryDZ = new Dropzone(container, {
      url: options.updatePath,
      addRemoveLinks: true,
      dictRemoveFileConfirmation: 'Ви впевнені?',
      headers: {
        'X-CSRF-Token': token
      }
    });
    if(options.isImage){
      galleryDZ.options.acceptedFiles = 'image/*'
    }

    galleryDZ.on("removedfile", function(file) {
      $.ajax({
        url: options.removePath.replace(':ID', file.id),
        method: 'delete',
        dataType: 'json'
      });
    });

    getAttachments(options.indexPath, galleryDZ);
    function getAttachments(url, dropzone) {
      if (dropzone) {
        $.getJSON(url).done(function(response) {
          response.data.forEach(function(mockFile) {
            dropzone.emit('addedfile', mockFile);
            dropzone.emit('thumbnail', mockFile, mockFile.thumb);
            dropzone.emit("complete", mockFile);
          });
        });
      }
    }

  }
}
