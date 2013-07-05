class AddTrackUrlToTracks < ActiveRecord::Migration
  def change
  	add_column :tracks, :track_url, :string
  end
end
