class PlaySetsController < ApplicationController
	respond_to :json

	def show

	end

	def update

	end

	def destroy

	end

	def create
		respond_with PlaySet.create(params[:play_set])
	end

	def index
		respond_with current_user.play_sets
	end

end
