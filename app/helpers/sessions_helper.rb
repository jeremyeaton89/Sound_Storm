module SessionsHelper

	def current_user
		@current_user ||= User.find_by_session_token(session[:session_token])
	end

	def login(user)
		user.session_token = SecureRandom::base64(12)
		user.save!

		session[:session_token] = user.session_token
	end

	def logout(user)
		return nil if current_user.nil?

		user.session_token = SecureRandom::base64(6)
		user.save!
		session[:session_token] = SecureRandom::base64(6)
	end

end
