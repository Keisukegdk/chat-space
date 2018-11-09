Rails.application.routes.draw do
  root 'groups#index'
  devise_for :users
  resources :users, only: [:index, :edit, :update]
  resources :groups, except: [:destroy, :show] do
    resources :messages, only: [:index, :create]
  end
end
