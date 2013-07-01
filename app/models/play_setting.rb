class PlaySetting < ActiveRecord::Base
  attr_accessible :play_set_id, :track_id

  belongs_to :play_set
  belongs_to :track

  validates :play_set_id, :track_id, presence: true
end
