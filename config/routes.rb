Rails.application.routes.draw do

  resources :categories
  resources :posts

  root 'home#index'
end
