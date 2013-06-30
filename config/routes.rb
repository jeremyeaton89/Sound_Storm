SoundStorm::Application.routes.draw do
  root to: "root#root"
  resource :profile
  resources :users
  resource :session

end
