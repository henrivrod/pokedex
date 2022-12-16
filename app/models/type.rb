class Type < ApplicationRecord
  has_many :poke_types
  has_many :pokemons, through: :poke_types
end
