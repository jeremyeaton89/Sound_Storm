SoundStorm::Application.routes.draw do
  root to: "root#root"
  resources :users
  resource :session

end
