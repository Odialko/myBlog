# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

Rails.application.config.assets.precompile += %w( datetimepicker.js )
Rails.application.config.assets.precompile += %w(ckeditor/config.js)
Rails.application.config.assets.precompile += %w( application/plugins/thin-line-icons.css )
Rails.application.config.assets.precompile += %w( cropper.js )
