class Following < ActiveRecord::Base
  attr_accessible :followee_id, :follower_id

  belongs_to :follower, class_name: "User"
  belongs_to :followed_user, class_name: "User"

  validates :follower, :followee, presence: true
  validates_uniqueness_of :follower_id, scope: :followee_id
end
