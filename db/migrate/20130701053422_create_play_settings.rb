class CreatePlaySettings < ActiveRecord::Migration
  def change
    create_table :play_settings do |t|
      t.integer :play_set_id
      t.integer :track_id

      t.timestamps
    end
  end
end
