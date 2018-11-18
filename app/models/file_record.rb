class FileRecord < ApplicationRecord
  mount_uploader :attachment, FilesUploader
  belongs_to :fileable, polymorphic: true

  before_destroy :remove_file

  def attachment_size
    attachment.size
  end

  private

  def remove_file
    attachment.remove!
  end
end
