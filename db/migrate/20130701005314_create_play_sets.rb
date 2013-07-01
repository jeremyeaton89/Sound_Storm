class CreatePlaySets < ActiveRecord::Migration
  def change
    create_table :play_sets do |t|
      t.integer :owner_id
      t.string :name

      t.timestamps
    end
  end
end
