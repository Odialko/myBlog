class Category < ApplicationRecord
  has_many :posts
  has_many :annotations, dependent: :destroy
end
