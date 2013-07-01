class Track < ActiveRecord::Base
  attr_accessible :name, :user_id

  belongs_to :user_id
  belongs_to :play_set

  validates :name, presence: true


end
