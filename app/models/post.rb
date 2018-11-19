class Post < ApplicationRecord
  has_many    :file_records, as: :fileable, dependent: :destroy
  belongs_to  :category
  has_many    :comments, as: :commentable, dependent: :destroy

  validates_presence_of :name, :content
end
