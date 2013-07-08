class TracksController < ApplicationController
	before_filter :authenticate_user
	respond_to :json
	
	def create
		# respond_with Track.create(params[:track])
		track = Track.create(params[:track])

		respond_to do |f|
			f.html { redirect_to "/users#/profile" }
			f.json { render :json => track }
		end
	end

	def destroy
		respond_with Track.find(params[:id]).destroy
	end

	def index
		# respond_with Track.all
		@tracks = Track.all
		respond_to do |f|
			f.html { render :index }
			f.json { render @tracks }
		end
	end

	def show
		respond_with Track.find(params[:id])
	end

	def update
		respond_with Track.find(params[:id]).update_attributes(params[:track])
	end

	def new
		@track = Track.new
	end
end
