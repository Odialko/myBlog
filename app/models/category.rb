class Category < ApplicationRecord
  has_many :posts
  has_many :comments, as: :commentable, dependent: :destroy
end
