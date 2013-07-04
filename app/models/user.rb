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
  has_attached_file :profile_picture, :styles => {
    :big => "600x600>",
    :small => "50x50#"
  }, :s3_host_name => "s3-us-west-2.amazonaws.com" 

  before_save :set_profile_picture_url

  def password=(password)
  	self.password_digest = BCrypt::Password.create(password)
  end

  def verify_password(password)
  	BCrypt::Password.new(self.password_digest) == password
  end

  def as_json(options = {})
    super(:except => [
      :password_digest, 
      :session_token
    ], 
    :include => [
      :tracks,
      :play_sets => { :include => :tracks }
      #, :reposts
    ])
  end

  private

  def set_profile_picture_url
    self.profile_picture_url = self.profile_picture.url
  end

end
