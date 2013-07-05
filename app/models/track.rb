class Track < ActiveRecord::Base
  attr_accessible :name, :owner_id, :audio

  belongs_to :owner, class_name: "User"
  has_many :play_settings
  has_many :play_sets, through: :play_settings
  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_attached_file :audio, 
    :storage => :s3,
    :s3_credentials => {
      :bucket => "tracks-development", #["images-development", "tracks-development"],
      :access_key_id => "AKIAIFLJSXXQSQBKJVMQ",
      :secret_access_key => "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"
    }, 
    :s3_host_name => "s3-us-west-2.amazonaws.com" 

  validates :name, :owner, presence: true

  def audio_url
    self.audio.url
  end
end
