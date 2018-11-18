CKEDITOR.plugins.add('readMore',{
    init: function(editor){
        var cmd = editor.addCommand('readMore', {
            exec:function(editor){
                if( editor.getSelection() ) {
                    var bookmarks = editor.getSelection().createBookmarks(),
                        range = editor.getSelection().getRanges()[ 0 ],
                        fragment = range.clone().cloneContents();
                    editor.getSelection().selectBookmarks( bookmarks );

                    var dataFromEditor = "",
                        childList = fragment.getChildren(),
                        childCount = childList.count();

                    for ( var i = 0; i < childCount; i++ ) {
                        var child = childList.getItem( i );
                        dataFromEditor += ( child.getOuterHtml?
                            child.getOuterHtml() : child.getText() );
                    }
                }
                var if_longread = $('#f_longread').is(':checked');

                var result ="";
                if(if_longread == true) {
                    result = '<div style="float:left; width:35%;" class="read-more-longread">'+'<p>'+dataFromEditor+'</p>'+'</div>';
                } else {
                    result = '<div style="float:left; width:35%;" class="read-more-left">'+'<p>'+dataFromEditor+'</p>'+'</div>';
                }

                // var testoviy = '<div class="read-more">'+retval+'</div>';

                editor.insertHtml(result);
                alert("'Читайте також' - було додано");
            }
        });
        cmd.modes = { wysiwyg : 1, source: 1 };// плагин будет работать и в режиме wysiwyg и в режиме исходного текста
        editor.ui.addButton('readMore',{
            label: 'ReadMore',
            command: 'readMore',
            icon: '/pics/chat.png'
        });

        var gallery = editor.addCommand('labelGallery', {
            exec:function(editor) {
              editor.insertHtml('<p><div class="labelGallery gallery bg-page flushed-left" style="color: #f7634a">Завантаження галереї ... </div></p>');
            }
        });
        gallery.modes = { wysiwyg : 1, source: 1 };
        editor.ui.addButton('labelGallery',{
          label: 'Додати галерею',
          command: 'labelGallery',
          icon: '/pics/gallery.png'
        });
    }
});

CKEDITOR.on( 'dialogDefinition', function( ev ) {

  function find_youtube_id(url){
    url = url.replace(/(>|<)/i,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    if(url[2] != undefined) {
      id = url[2].split(/[^0-9a-z_\-]/i);
      id = id[0];
    } else {
      id = url;
    }
    return id
  }
  function wrapperVideo(frame){
    var open = '<p></p><div class="text-center attached-video-inside embed-responsive embed-responsive-16by9">',
        close = '</div><p></p>';
    return open + frame + close;
  }
  function buildFrame(video_url){
    return '<iframe title="YouTube video player" class="embed-responsive-item" src="//www.youtube.com/embed/'+ find_youtube_id(video_url) + '" frameborder="0" allowfullscreen=""></iframe>';
  }

  var dialogName = ev.data.name;
  var dialog = ev.data.definition.dialog;
  if(ev.data.name == 'html5video') {
    dialog.on('ok', function () {
      ev.editor.insertHtml(wrapperVideo(buildFrame(this.getValueOf('tab1', 'iframeUrl'))));
    });
  }

});

CKEDITOR.dialog.add( 'html5video', function( editor ) {
    return {
        title: 'Введіть посилання на відео',
        minWidth: 500,
        minHeight: 100,
        contents: [{
          id: 'tab1',
          label: 'Info label',
          elements: [
            {
              type: 'text',
              id: 'iframeUrl',
              label: 'Посилання',
              validate : CKEDITOR.dialog.validate.notEmpty( 'Поле не може бути пустим' ),
              required : true
            }
          ]
        }]
  }
})

CKEDITOR.plugins.add( 'utubevideo', {
    init: function( editor ) {
        editor.addCommand( 'embedVideo',  new CKEDITOR.dialogCommand( 'html5video' ));
        editor.ui.addButton( 'addVideo', {
            label: 'Додати відео',
            command: 'embedVideo',
            toolbar: 'insert',
            icon: '/pics/video.png'
        });
    }
});

CKEDITOR.on( 'instanceReady', function( evt ) {
  evt.editor.dataProcessor.htmlFilter.addRules( {
    elements: {
      img: function(el) {
        el.addClass('img-responsive');
      }
    }
  });
});
CKEDITOR.editorConfig = function( config )
{
    config.allowedContent = true;
    config.basicEntities = false;
    config.tabSpaces = 0;
    // config.filebrowserBrowseUrl = '/ckeditor/pictures';
    config.removeFormatTags = 'code,del,dfn,font,i,ins,kbd,q,samp,small,span,tt,var';
    config.filebrowserUploadUrl = '/ckeditor/pictures';
    config.format_tags = 'p;table;h1;h2;h3;h4;h5;h6;pre;address;div';
    config.format_table = { element: 'div', name: 'Таблиця', attributes: { 'class': 'table-responsive' } };
    config.extraPlugins = 'readMore,utubevideo';
    config.toolbar = 'MyToolbar';
    config.autoParagraph = false;
    config.fillEmptyBlocks = false;
    config.ignoreEmptyParagraph = true;
    config.copyFormatting_allowedContexts = [ 'text' ];
    config.toolbar_MyToolbar =
        [
            { name: 'clipboard', items : [ 'PasteText', '-', 'Undo', 'Redo' ] },
            { name: 'paragraph', items : [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'basicstyles', items : [ 'Bold', 'Italic', 'Underline', '-', 'Strike', 'RemoveFormat' ] },
            { name: 'colors', items : [ 'TextColor', 'BGColor' ] },
            { name: 'paragraph2', items : [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-','Blockquote' ] },
            { name: 'links', items : [ 'Link', 'Unlink', 'Anchor' ] },
            { name: 'document', items : [ 'Source']},
            { name: 'styles', items : [ 'Format' ] },
            { name: 'insert', items : [ 'Image', 'Table','HorizontalRule','SpecialChar' ] },
            { name: 'paragraph3', items : ['readMore'] },
            { name: 'paragraph4', items : ['labelGallery', 'addVideo'] },
            { name: 'tools', items : [ 'Maximize'] },

            // { name: 'styles', items : [ 'Format' ] },
            { name: 'basicstyles', items : [ 'Subscript','Superscript' ] }
            // { name: 'colors', items : [ 'TextColor','BGColor' ] },
            // { name: 'paragraph', items : [ 'NumberedList','BulletedList', '-', 'Outdent', 'Indent', '-','Blockquote', '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'] },
            // { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
            // { name: 'insert', items : [ 'Image', 'Table','HorizontalRule','SpecialChar' ] },
            // { name: 'tools', items : [ 'Maximize'] },
            // { name: 'document', items : [ 'Source']},
            // { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] }


            // { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
            // { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
            // { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
            // { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
            //     'HiddenField' ] },
            // '/',
            // { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
            // { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
            //     '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
            // { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
            // { name: 'insert', items : [ 'CreateDiv', 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
            // '/',
            // { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
            // { name: 'colors', items : [ 'TextColor','BGColor' ] },
            // { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }
        ];
};
