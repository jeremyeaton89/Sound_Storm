class TracksController < ApplicationController
	respond_to :json

	def create
		respond_with Track.create(params[:track])
	end

	def destroy
		respond_with Track.find(params[:id]).destroy
	end

	def index
		respond_with Track.all
	end

	def show
		respond_with Track.find(params[:id])
	end
end
