class Comment < ActiveRecord::Base

  before_save :titleize_attr

  belongs_to :commentable, polymorphic: true
  validates :content, :author, presence: true

  def titleize_attr
    self.author = author.mb_chars.titleize
  end
end
