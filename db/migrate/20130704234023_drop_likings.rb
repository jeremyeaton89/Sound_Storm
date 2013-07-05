class DropLikings < ActiveRecord::Migration
  def up
  	drop_table :likings
  end

  def down
  	create_table :likings do |t|
      t.integer :user_id
      t.integer :like_id

      t.timestamps
    end
  end
end
