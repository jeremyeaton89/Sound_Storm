class AddSetIdToTracks < ActiveRecord::Migration
  def change
  	add_column :tracks, :set_id, :integer
  	add_index :tracks, :name
  end
end
