class PlaySet < ActiveRecord::Base
  attr_accessible :name, :owner_id

  has_many :play_settings
  has_many :tracks, through: :play_settings
  
  belongs_to :owner, class_name: "User"

  validates :owner, :name, presence: true
  
end
