class Comment < ActiveRecord::Base

  before_save :titleize_attr

  belongs_to :commentable, :polymorphic => true
  validates :content, presence: true
  validates :author, presence: true

  def titleize_attr
    self.author = author.titleize
  end
end
