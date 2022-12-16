# frozen_string_literal: true

Rails.application.routes.draw do
  resources :types
  root to: redirect('/pokemon')

  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  get 'pokemon', to: 'site#index'
  get 'pokemon/new', to: 'site#index'
  get 'pokemon/:id', to: 'site#index'
  get 'pokemon/:id/edit', to: 'site#index'

  namespace :api do
    resources :pokemon, only: %i[index show create destroy update]
  end

  post '/users', to: 'users#create'
end
