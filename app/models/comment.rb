class Comment < ActiveRecord::Base

  validates :content, presence: true
  validates :author, presence: true

  belongs_to :commentable, :polymorphic => true
end
