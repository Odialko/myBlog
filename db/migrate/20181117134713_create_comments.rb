class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :author
      t.string :content
      t.references :annotations, polymorphic: true, index: true

      t.timestamps
    end
  end
end
