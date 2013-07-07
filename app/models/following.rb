class Following < ActiveRecord::Base
  attr_accessible :followed_user_id, :follower_id

  belongs_to :follower, class_name: "User"
  belongs_to :followed_user, class_name: "User"

  validates :follower, :followed_user, presence: true
  validates_uniqueness_of :follower_id, scope: :followed_user_id
end
