Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'

  concern :attachmentable do
    resources :file_records, only: %i[index create destroy]
  end

  resources :categories
  resources :posts, defaults: { record_type: 'Post' }, except: :show, shallow: true do
    concerns :attachmentable
  end

  root 'home#index'
end
