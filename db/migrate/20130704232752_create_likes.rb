class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :track_id

      t.timestamps
    end
  end
end
