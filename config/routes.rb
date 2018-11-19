Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'

  concern :attachmentable do
    resources :file_records
  end

  concern :comentable do
    resources :comments, only: %i[create destroy]
  end

  resources :categories do
    concerns :comentable
  end
  resources :posts, defaults: { record_type: 'Post' }, shallow: true do
    concerns :attachmentable, :comentable
  end

  root 'home#index'
end
