class RemoveSetIdFromTracks < ActiveRecord::Migration
  def up
  	remove_column :tracks, :set_id
  end

  def down
  	add_column :tracks, :set_id, :integer
  end
end
