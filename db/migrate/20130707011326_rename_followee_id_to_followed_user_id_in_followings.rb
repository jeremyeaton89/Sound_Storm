class RenameFolloweeIdToFollowedUserIdInFollowings < ActiveRecord::Migration
  def change
  	rename_column :followings, :followee_id, :followed_user_id
  end
end
