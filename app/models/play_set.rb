class PlaySet < ActiveRecord::Base
  attr_accessible :name, :owner_id

  has_many :tracks
  belongs_to :owner, class_name: "User"

  validates :owner, :name, presence: true
  
end
