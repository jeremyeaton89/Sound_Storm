class Track < ActiveRecord::Base
  attr_accessible :name, :owner_id, :audio, :audio_url

  belongs_to :owner, class_name: "User"
  has_many :play_settings
  has_many :play_sets, through: :play_settings

  has_attached_file :audio

  validates :name, :owner, presence: true

  before_save :set_audio_url

  private

  def set_audio_url
  	self.audio_url = self.audio.url
  end


end
