class PokeType < ApplicationRecord
  belongs_to :pokemon
  belongs_to :type, optional: true
end
