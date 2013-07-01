class ChangeUserIdToOwnerIdInTracks < ActiveRecord::Migration
  def change
  	rename_column :tracks, :user_id, :owner_id
  end
end
