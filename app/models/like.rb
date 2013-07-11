class Like < ActiveRecord::Base
  attr_accessible :track_id, :user_id

  belongs_to :track 
  belongs_to :user 

  validates :track, :user, presence: true
  validates_uniqueness_of :user_id, scope: :track_id

  def as_json(options = {}) 
  	super(:include => [:track => { :methods => :image_url }])
  end

end

