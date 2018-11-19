Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'

  concern :attachmentable do
    resources :file_records
  end
  # resources :comments, :only => [:create, :destroy]

  resources :categories
  resources :posts, defaults: { record_type: 'Post' }, shallow: true do
    concerns :attachmentable
    resources :comments, :only => [:create, :destroy]
  end

  root 'home#index'
end
