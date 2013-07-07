class Track < ActiveRecord::Base
  attr_accessible :name, :owner_id, :audio

  belongs_to :owner, class_name: "User"
  has_many :play_settings
  has_many :play_sets, through: :play_settings
  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_attached_file :audio

  validates :name, :owner, presence: true

  def audio_url
    self.audio.url
  end
end
