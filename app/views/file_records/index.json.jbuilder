# frozen_string_literal: true

json.data @file_records do |file|
  json.id file.id
  json.name file.attachment.file.filename
  json.size file.attachment.size
  json.thumb file_icon(file.attachment)
  json.image file.attachment.url
end
