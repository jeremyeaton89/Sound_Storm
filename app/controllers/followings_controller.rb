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
			follower_id: params[:follower_id], followee_id: params[:followee_id]
		).first
		respond_with following.destroy
	end
end
