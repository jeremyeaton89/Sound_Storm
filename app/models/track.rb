class Track < ActiveRecord::Base
  attr_accessible :name, :owner_id, :audio#, :image

  belongs_to :owner, class_name: "User"
  has_many :play_settings
  has_many :play_sets, through: :play_settings
  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user
  has_many :comments, dependent: :destroy

  has_attached_file :audio
  # has_attached_file :image

  validates :name, :owner, presence: true

  def audio_url
    self.audio.url
  end

  # def image_url
  #   self.image.url
  # end
end
