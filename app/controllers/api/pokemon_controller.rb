# frozen_string_literal: true

class Api::PokemonController < ApplicationController
  before_action :set_pokemon, only: %i[show update destroy]

  def index
    @pokemon = Pokemon.all
    render json: @pokemon
  end

  def show
    render json: @pokemon
  end

  def create
    @pokemon = Pokemon.new(pokemon_params)

    if @pokemon.save
      render json: @pokemon, status: :created
    else
      render json: @pokemon.errors, status: :unprocessable_entity
    end
  end

  def update
    if @pokemon.update(pokemon_params)
      render json: @pokemon, status: :ok
    else
      render json: @pokemon.errors, status: :unprocessable_entity
    end
  end

  private

  def set_pokemon
    @pokemon = Pokemon.find(params[:id])
  end

  def pokemon_params
    params.require(:pokemon).permit(
      :id, :name, :image_url, :created_at, :updated_at
    )
  end
end
