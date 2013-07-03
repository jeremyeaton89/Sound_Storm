class PlaySettingsController < ApplicationController
	respond_to :json

	def create
		p "PARAMS::::: #{params}"
		respond_with PlaySetting.create(params[:play_setting])
	end

	def destroy

	end
end
