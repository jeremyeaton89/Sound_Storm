class RemoveAudioUrlFromTracks < ActiveRecord::Migration
  def up
  	remove_column :tracks, :audio_url
  end

  def down
  	add_column :tracks, :audio_url, :string
  end
end
