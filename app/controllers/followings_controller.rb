class FollowingsController < ApplicationController
	respond_to :json

	def index
		respond_with User.all
	end

	def create
		respond_with Following.create(params[:following])
	end

	def destroy
		following = Following.where(
			follower_id: params[:follower_id], followed_user_id: params[:followed_user_id]
		).first
		respond_with following.destroy
	end
end
