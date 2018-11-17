class Comment < ApplicationRecord
  belongs_to :annotations, polymorphic: true
end
