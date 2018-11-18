class Post < ApplicationRecord
  has_many    :annotations
  has_many    :file_records, as: :fileable, dependent: :destroy
  belongs_to  :category
end
