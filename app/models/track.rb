class Track < ActiveRecord::Base
  attr_accessible :name, :owner_id, :audio, :category, :image

  belongs_to :owner, class_name: "User"
  has_many :play_settings
  has_many :play_sets, through: :play_settings
  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user
  has_many :comments, dependent: :destroy

  has_attached_file :audio
  has_attached_file :image
  CATEGORIES = %W(pop jazz/blues hiphop rock alternative reggae other)
  validates :name, :owner_id, presence: true
  validates :category, presence: true, inclusion: { :in => CATEGORIES }

  def audio_url
    self.audio.url
  end

  def image_url
    self.image.url
  end

  def self.CATEGORIES
    CATEGORIES
  end

  def as_json(options = {})
    super( 
      :methods => [:image_url, :audio_url],
      :include => [
        {:comments => {:include => {:author => {:methods => :profile_picture_url}}}},
        {:owner => { :methods => :profile_picture_url}}
      ]
    )
  end
end
