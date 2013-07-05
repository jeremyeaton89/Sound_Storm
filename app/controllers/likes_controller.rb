class LikesController < ApplicationController
	respond_to :json

	def create
		respond_with Like.create(params[:like])
	end

	def destroy
		respond_with Like.find(params[:id]).destroy
	end

end
