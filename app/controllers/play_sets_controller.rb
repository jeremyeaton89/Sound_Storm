class PlaySetsController < ApplicationController
	respond_to :json

	def show

	end

	def update
		respond_with PlaySet.find(params[:id]).update_attributes(params[:play_set])
	end

	def destroy
		respond_with PlaySet.find(params[:id]).destroy
	end

	def create
		respond_with PlaySet.create(params[:play_set])
	end

	def index
		respond_with current_user.play_sets
	end

end
