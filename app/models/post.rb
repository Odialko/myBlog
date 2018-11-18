class Post < ApplicationRecord
  has_many    :annotations
  belongs_to  :category
end
