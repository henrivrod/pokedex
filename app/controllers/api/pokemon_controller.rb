# frozen_string_literal: true

class Api::PokemonController < ApplicationController
  before_action :set_pokemon, only: %i[show update destroy]

  def index
    results = []
    Pokemon.all.each do |pokemon|
      entry ={
        "id" => pokemon.id,
        "name" => pokemon.name,
        "image_url" => pokemon.image_url,
        "types" => Type.where(id: PokeType.where(pokemon_id: pokemon.id).pluck(:type_id))
      }
      results << entry
    @returned = {
      "results" => results,
      "types" => Type.all
    }
    end
    render json: @returned
  end

  def show
    render json: @pokemon
  end

  def create
    @pokemon = Pokemon.new
    @pokemon.name = params["name"]
    @pokemon.image_url = params["image_url"]
    if @pokemon.save
      params["types"].each do |t|
        @type = Type.where(name: t).pluck(:id)
        puts @type
        PokeType.create(pokemon_id: @pokemon.id, type_id: @type[0])
      end
      returned = {
        "id"=> @pokemon.id,
        "name" => @pokemon.name,
        "image_url" => @pokemon.image_url,
        "types" => Type.where(name: params["types"])
      }
      render json: returned, status: :created
    else
      render json: @pokemon.errors, status: :unprocessable_entity
    end
  end

  def update
    if @pokemon.update(pokemon_params)
      new_types = Type.where(name: params["types"]).pluck(:id)
      old_types = PokeType.where(pokemon_id: @pokemon.id).pluck(:type_id)
      old_types.each do |o|
        if ! new_types.include? o
          PokeType.where(pokemon_id: @pokemon.id, type_id: o).destroy_all
        end
      end
      new_types.each do |n|
        if ! old_types.include? n
          PokeType.create(pokemon_id: @pokemon.id, type_id: n)
        end
      end
      returned = {
        "id"=> @pokemon.id,
        "name" => @pokemon.name,
        "image_url" => @pokemon.image_url,
        "types" => Type.where(id: new_types)
      }
      render json: returned, status: :ok
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
      :id, :name, :image_url, :created_at, :updated_at, :types
    )
  end
end
