Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'

  resources :categories
  resources :posts

  root 'home#index'
end
