class FilesUploader < CarrierWave::Uploader::Base

  def size_range
    0..2.megabytes
  end

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist
    %w(doc docx xls xlsx ppt pptx pdf zip jpeg jpg png gif)
  end
end
