class UsersController < ApplicationController
	before_filter :authenticate_user, except: [:new, :create]
	respond_to :json

	def new
		@user = User.new
	end

	def create
		@user = User.new(params[:user])
		
		if @user.save
			login(@user)

			redirect_to users_url
		else
			flash[:errors] = @user.errors.full_messages
			render :new
		end
	end

	def show
		respond_with current_user
	end

	def index
		respond_to do |format|
			format.html { render :index }
			format.json { render json: current_user }
		end
	end

	def update
		respond_with current_user.update_attributes(params[:user])
	end

end
