class RootController < ApplicationController

	def root
		
		if current_user
			redirect_to users_url
		else
			render :root
		end
	end

end
