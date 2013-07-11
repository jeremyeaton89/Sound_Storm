class Comment < ActiveRecord::Base
  attr_accessible :author_id, :offset, :track_time, :track_id, :content

  belongs_to :author, class_name: "User"
  belongs_to :track

  validates :author_id, :offset, :track_time, :track_id, :content, presence: true

  def profile_picture_url
  	self.author.profile_picture.url
  end

  def as_json(options = {})
  	super(:include => :track)
  end
end
