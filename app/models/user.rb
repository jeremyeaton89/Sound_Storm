require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :password, :username, :session_token, 
    :first_name, :last_name, :bio, :city, :country_code

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true, length: { minimum: 6 }
  validates :city, presence: true, length: { minimum: 2 }

  has_many :profile_images

  def password=(password)
  	self.password_digest = BCrypt::Password.create(password)
  end

  def verify_password(password)
  	BCrypt::Password.new(self.password_digest) == password
  end

end
