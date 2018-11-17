class Post < ApplicationRecord
  has_many    :annotations, dependent: :destroy
  belongs_to  :category
end
