class Track < ActiveRecord::Base
  attr_accessible :name, :owner_id

  belongs_to :owner, class_name: "User"
  has_many :play_settings
  has_many :play_sets, through: :play_settings

  validates :name, :owner, presence: true


end
