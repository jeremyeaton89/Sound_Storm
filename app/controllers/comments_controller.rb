class CommentsController < ApplicationController
	respond_to :json

	def create
		respond_with Comment.create(params[:comment])
	end

	def destroy
		respond_with Comment.find(params[:id]).destroy
	end

end
