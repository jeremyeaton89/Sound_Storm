class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :author_id
      t.integer :track_id
      t.integer :track_time
      t.integer :offset

      t.timestamps
    end
  end
end
