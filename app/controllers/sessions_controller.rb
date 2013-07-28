class SessionsController < ApplicationController

	def new
		@user = User.new
	end

	def create
		@user = User.find_by_username(params[:user][:username])

		if @user && @user.verify_password(params[:user][:password])
			login(@user)
			redirect_to "/users#/profile"
		else
			flash[:errors] = "Invalid Login"
			redirect_to root_url
		end
	end

	def destroy
		logout(current_user)
		redirect_to root_url
	end

end
