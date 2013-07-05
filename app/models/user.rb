require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :password, :username, :session_token, 
    :first_name, :last_name, :bio, :city, :country_code, :profile_picture

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true, length: { minimum: 6 }
  # validates :city, presence: true, length: { minimum: 2 } 

  # has_many :profile_images
  has_many :tracks, foreign_key: :owner_id
  has_many :play_sets, foreign_key: :owner_id
  has_many :likes
  has_many :liked_tracks, through: :likes, source: :track
  
  has_attached_file :profile_picture, 
    :storage => :s3,
    :s3_credentials => {
      :bucket => "images-development", #["images-development", "tracks-development"],
      :access_key_id => "AKIAIFLJSXXQSQBKJVMQ",
      :secret_access_key => "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"
    }, :s3_host_name => "s3-us-west-2.amazonaws.com" 

  def password=(password)
  	self.password_digest = BCrypt::Password.create(password)
  end

  def verify_password(password)
  	BCrypt::Password.new(self.password_digest) == password
  end

  def profile_picture_url
    self.profile_picture.url
  end

  def as_json(options = {})
    super(:except => [
      :password_digest, 
      :session_token
    ], 
    :methods => :profile_picture_url,
    :include => [
      { :likes => { :include => :track }},
      { :play_sets => { :include => :tracks }},
      { :tracks => { :methods => :audio_url }}
    ])
  end

end
