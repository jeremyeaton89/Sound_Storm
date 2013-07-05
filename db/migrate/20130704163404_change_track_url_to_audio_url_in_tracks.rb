class ChangeTrackUrlToAudioUrlInTracks < ActiveRecord::Migration
  def change
  	rename_column :tracks, :track_url, :audio_url
  end
end
