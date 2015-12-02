Rails.application.routes.draw do
  root to: 'staticpages#root'

  namespace :api, defaults: {format: :json} do
    resources :tracks
  end
end
