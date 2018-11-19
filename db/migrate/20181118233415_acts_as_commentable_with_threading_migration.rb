class ActsAsCommentableWithThreadingMigration < ActiveRecord::Migration[5.1]
  def self.up
    create_table :comments, :force => true do |t|
      t.integer :commentable_id
      t.string :commentable_type
      t.string :author
      t.text :content
      t.integer :parent_id, :lft, :rgt
      t.timestamps
    end

    add_index :comments, [:commentable_id, :commentable_type]
  end

  def self.down
    drop_table :comments
  end
end