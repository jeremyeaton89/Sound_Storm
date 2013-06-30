class ApplicationController < ActionController::Base
  protect_from_forgery

  include SessionsHelper

  private

	  def authenticate_user
	  	unless current_user
	  		flash[:errors] = "Must be logged in to view that page."
	  		redirect_to root_url
	  	end
	  end
end
