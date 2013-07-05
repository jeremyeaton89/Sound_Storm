class Liking < ActiveRecord::Base
  attr_accessible :like_id, :user_id

  belongs_to :user
  belongs_to :like

  validates :user, :like, presence: true
end
