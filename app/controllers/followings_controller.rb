class FollowingsController < ApplicationController
	respond_to :json

	def index
		respond_with User.all
	end

	def create

	end

	def destroy

	end

end
