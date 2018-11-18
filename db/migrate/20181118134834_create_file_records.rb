class CreateFileRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :file_records do |t|
      t.integer :fileable_id
      t.string :fileable_type
      t.string :attachment

      t.timestamps
    end
  end
end
