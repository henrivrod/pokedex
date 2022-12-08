# frozen_string_literal: true

Rails.application.routes.draw do
  root to: redirect('/pokemon')

  get 'pokemon', to: 'site#index'
  get 'pokemon/new', to: 'site#index'
  get 'pokemon/:id', to: 'site#index'
  get 'pokemon/:id/edit', to: 'site#index'

  namespace :api do
    resources :pokemon, only: %i[index show create destroy update]
  end
end
