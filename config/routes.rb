SoundStorm::Application.routes.draw do
  root to: "root#root"
  resources :followings
  resources :likes
  resources :play_sets
  resources :play_settings
  resources :users do
  	# resources :tracks
  end
  resources :tracks
  resource :session

end
