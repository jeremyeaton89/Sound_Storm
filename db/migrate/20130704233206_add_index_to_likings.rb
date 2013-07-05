class AddIndexToLikings < ActiveRecord::Migration
  def change
  	add_index :likings, [:user_id, :like_id], unique: true
  end
end
