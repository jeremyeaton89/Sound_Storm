class PlaySettingsController < ApplicationController
	respond_to :json

	def create
		respond_with PlaySetting.create(params[:play_setting])
	end

	def destroy
		play_setting = PlaySetting.where(track_id: params[:track_id], play_set_id: params[:play_set_id]).first
		respond_with play_setting.destroy
	end
end
